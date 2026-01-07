import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Supply from "@/models/Supply";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import { supplySchema } from "@/lib/validations/supply";
import { createBatches } from "@/lib/fifo";
import mongoose from "mongoose";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const supplies = await Supply.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: supplies });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch supplies" },
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
    const validatedData = supplySchema.parse(body);

    let totalCost = 0;

    for (const item of validatedData.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productName}`);
      }

      const sizeIndex = product.sizes.findIndex(
        (s) => s.label === item.sizeLabel
      );

      if (sizeIndex === -1) {
        throw new Error(
          `Size ${item.sizeLabel} not found for product ${product.name}`
        );
      }

      await Product.updateOne(
        {
          _id: item.product,
          "sizes.label": item.sizeLabel,
        },
        {
          $inc: {
            [`sizes.${sizeIndex}.quantity`]: item.quantity,
          },
        },
        { session }
      );

      totalCost += item.quantity * item.costPrice;
    }

    const supply = await Supply.create(
      [
        {
          date: validatedData.date || new Date(),
          items: validatedData.items,
          totalCost,
        },
      ],
      { session }
    );

    // Создать партии товара
    await createBatches(supply[0]._id, validatedData.items, session);

    const financialStats = await FinancialStats.findOne().session(session);

    if (!financialStats) {
      await FinancialStats.create(
        [{ currentBalance: -totalCost }],
        { session }
      );
    } else {
      await FinancialStats.updateOne(
        {},
        { $inc: { currentBalance: -totalCost } },
        { session }
      );
    }

    await Transaction.create(
      [
        {
          type: "EXPENSE",
          category: "SUPPLY",
          amount: totalCost,
          reason: `Завоз от ${new Date(validatedData.date || new Date()).toLocaleDateString("ru-RU")}`,
          referenceId: supply[0]._id,
          date: validatedData.date || new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: supply[0] },
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
      { success: false, error: "Failed to create supply" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
