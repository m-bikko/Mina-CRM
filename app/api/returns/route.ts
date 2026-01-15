import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Return from "@/models/Return";
import Sale from "@/models/Sale";
import Product from "@/models/Product";
import InventoryBatch from "@/models/InventoryBatch";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import { returnSchema } from "@/lib/validations/return";
import mongoose from "mongoose";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const returns = await Return.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: returns });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch returns" },
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
    const validatedData = returnSchema.parse(body);

    const sale = await Sale.findById(validatedData.saleId).session(session);

    if (!sale) {
      throw new Error("Sale not found");
    }

    const existingReturn = await Return.findOne({ sale: sale._id }).session(session);
    if (existingReturn) {
      throw new Error("This sale has already been returned");
    }

    let totalAmount = 0;
    let totalCostPrice = 0;

    for (const item of validatedData.items) {
      const saleItem = sale.items.find(
        (si) =>
          si.product.toString() === item.product &&
          si.sizeLabel === item.sizeLabel
      );

      if (!saleItem) {
        throw new Error(
          `Item ${item.productName} (${item.sizeLabel}) not found in original sale`
        );
      }

      if (item.quantity > saleItem.quantity) {
        throw new Error(
          `Cannot return more than sold: ${item.productName} (${item.sizeLabel})`
        );
      }

      totalAmount += item.quantity * item.priceAtSale;
      totalCostPrice += item.quantity * item.costPrice;
    }

    const taxRate = sale.taxRateSnapshot;
    const bankCommissionRate = sale.bankCommissionRateSnapshot;

    const taxAmountReversed = (totalAmount * taxRate) / 100;
    const bankCommissionLost = (totalAmount * bankCommissionRate) / 100;
    const refundAmount = totalAmount - bankCommissionLost;

    for (const item of validatedData.items) {
      const product = await Product.findById(item.product).session(session);
      if (product) {
        const sizeIndex = product.sizes.findIndex(
          (s) => s.label === item.sizeLabel
        );
        if (sizeIndex !== -1) {
          await Product.updateOne(
            { _id: item.product, "sizes.label": item.sizeLabel },
            { $inc: { [`sizes.${sizeIndex}.quantity`]: item.quantity } },
            { session }
          );
        }
      }

      await InventoryBatch.create(
        [
          {
            product: item.product,
            productName: item.productName,
            sizeLabel: item.sizeLabel,
            supply: null,
            costPrice: item.costPrice,
            initialQuantity: item.quantity,
            remainingQuantity: item.quantity,
          },
        ],
        { session }
      );
    }

    const returnDoc = await Return.create(
      [
        {
          sale: sale._id,
          date: new Date(),
          customerPhone: sale.customerPhone,
          paymentTypeName: sale.paymentTypeName,
          items: validatedData.items,
          totalAmount,
          totalCostPrice,
          refundAmount,
          taxAmountReversed,
          bankCommissionLost,
        },
      ],
      { session }
    );

    await FinancialStats.updateOne(
      {},
      { $inc: { currentBalance: -refundAmount } },
      { session }
    );

    await Transaction.create(
      [
        {
          type: "EXPENSE",
          category: "RETURN",
          amount: refundAmount,
          reason: `Возврат ${sale.customerPhone}${bankCommissionLost > 0 ? ` (потеря комиссии: ${bankCommissionLost.toFixed(2)} ₸)` : ""}`,
          referenceId: returnDoc[0]._id,
          date: new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: returnDoc[0] },
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
      { success: false, error: "Failed to create return" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
