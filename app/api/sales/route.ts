import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Sale from "@/models/Sale";
import Product from "@/models/Product";
import PaymentType from "@/models/PaymentType";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import { saleSchema } from "@/lib/validations/sale";
import { allocateBatches, calculateTotalCost } from "@/lib/fifo";
import mongoose from "mongoose";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const sales = await Sale.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: sales });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectDB();

    const body = await request.json();
    const validatedData = saleSchema.parse(body);

    const paymentType = await PaymentType.findById(
      validatedData.paymentType
    ).session(session);

    if (!paymentType) {
      throw new Error("Payment type not found");
    }

    // Проверка наличия товара
    for (const item of validatedData.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productName}`);
      }

      const size = product.sizes.find((s) => s.label === item.sizeLabel);

      if (!size) {
        throw new Error(
          `Size ${item.sizeLabel} not found for product ${product.name}`
        );
      }

      if (size.quantity < item.quantity) {
        throw new Error(
          `Недостаточно товара: ${product.name} размер ${item.sizeLabel}. Доступно: ${size.quantity}, запрошено: ${item.quantity}`
        );
      }
    }

    // Распределить товары по партиям FIFO + рассчитать себестоимость
    let totalAmount = 0;
    let totalCostPrice = 0;
    const itemsWithAllocations = [];

    for (const item of validatedData.items) {
      // Распределить по партиям
      const allocations = await allocateBatches(
        item.product,
        item.sizeLabel,
        item.quantity,
        session
      );

      // Рассчитать себестоимость этого item
      const itemCostPrice = calculateTotalCost(allocations);

      itemsWithAllocations.push({
        product: item.product,
        productName: item.productName,
        sizeLabel: item.sizeLabel,
        quantity: item.quantity,
        priceAtSale: item.priceAtSale,
        batchAllocations: allocations,
        totalCostPrice: itemCostPrice,
      });

      totalAmount += item.quantity * item.priceAtSale;
      totalCostPrice += itemCostPrice;
    }

    // Обновить Product.quantity
    for (const item of validatedData.items) {
      const product = await Product.findById(item.product).session(session);

      const sizeIndex = product!.sizes.findIndex(
        (s) => s.label === item.sizeLabel
      );

      await Product.updateOne(
        {
          _id: item.product,
          "sizes.label": item.sizeLabel,
        },
        {
          $inc: {
            [`sizes.${sizeIndex}.quantity`]: -item.quantity,
          },
        },
        { session }
      );
    }

    const taxAmount = (totalAmount * paymentType.taxRate) / 100;
    const bankCommissionAmount = (totalAmount * paymentType.bankCommissionRate) / 100;

    // Сумма, которая фактически попадает в баланс (после вычета комиссии)
    const amountToBalance = totalAmount - bankCommissionAmount;

    const sale = await Sale.create(
      [
        {
          date: validatedData.date || new Date(),
          customerPhone: validatedData.customerPhone,
          paymentType: validatedData.paymentType,
          paymentTypeName: paymentType.name,
          taxRateSnapshot: paymentType.taxRate,
          bankCommissionRateSnapshot: paymentType.bankCommissionRate,
          items: itemsWithAllocations,
          totalAmount,
          taxAmount,
          bankCommissionAmount,
          totalCostPrice,
        },
      ],
      { session }
    );

    const financialStats = await FinancialStats.findOne().session(session);

    if (!financialStats) {
      await FinancialStats.create(
        [{ currentBalance: amountToBalance }],
        { session }
      );
    } else {
      await FinancialStats.updateOne(
        {},
        { $inc: { currentBalance: amountToBalance } },
        { session }
      );
    }

    await Transaction.create(
      [
        {
          type: "INCOME",
          category: "SALE",
          amount: amountToBalance,
          reason: `Продажа ${validatedData.customerPhone}${bankCommissionAmount > 0 ? ` (комиссия банка: ${bankCommissionAmount.toFixed(2)} ₸)` : ""}`,
          referenceId: sale[0]._id,
          date: validatedData.date || new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: sale[0] },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create sale" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
