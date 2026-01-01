import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import WriteOff from "@/models/WriteOff";
import InventoryBatch from "@/models/InventoryBatch";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import mongoose from "mongoose";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const writeOffs = await WriteOff.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: writeOffs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch write-offs" },
      { status: 500 }
    );
  }
}

interface WriteOffItemInput {
  inventoryBatchId: string;
  quantity: number;
}

interface WriteOffInput {
  items: WriteOffItemInput[];
  reason: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectDB();

    const body: WriteOffInput = await request.json();

    if (!body.items || body.items.length === 0) {
      throw new Error("Добавьте хотя бы один товар");
    }

    if (!body.reason || body.reason.trim() === "") {
      throw new Error("Укажите причину списания");
    }

    let totalRefund = 0;
    const writeOffItems = [];

    for (const item of body.items) {
      const batch = await InventoryBatch.findById(item.inventoryBatchId).session(session);

      if (!batch) {
        throw new Error("Партия не найдена");
      }

      if (batch.remainingQuantity < item.quantity) {
        throw new Error(
          `Недостаточно товара в партии ${batch.productName} (${batch.sizeLabel}). Доступно: ${batch.remainingQuantity}`
        );
      }

      // Update inventory batch
      await InventoryBatch.updateOne(
        { _id: batch._id },
        { $inc: { remainingQuantity: -item.quantity } },
        { session }
      );

      // Update product quantity
      const product = await Product.findById(batch.product).session(session);
      if (product) {
        const sizeIndex = product.sizes.findIndex(
          (s) => s.label === batch.sizeLabel
        );

        if (sizeIndex !== -1) {
          await Product.updateOne(
            { _id: batch.product, "sizes.label": batch.sizeLabel },
            { $inc: { [`sizes.${sizeIndex}.quantity`]: -item.quantity } },
            { session }
          );
        }
      }

      const itemRefund = item.quantity * batch.costPrice;
      totalRefund += itemRefund;

      writeOffItems.push({
        inventoryBatch: batch._id,
        product: batch.product,
        productName: batch.productName,
        sizeLabel: batch.sizeLabel,
        quantity: item.quantity,
        costPrice: batch.costPrice,
        supplyDate: batch.createdAt,
      });
    }

    // Create write-off record
    const writeOff = await WriteOff.create(
      [
        {
          date: new Date(),
          items: writeOffItems,
          totalRefund,
          reason: body.reason,
        },
      ],
      { session }
    );

    // Update financial stats (add back the cost price)
    const financialStats = await FinancialStats.findOne().session(session);

    if (!financialStats) {
      await FinancialStats.create([{ currentBalance: totalRefund }], { session });
    } else {
      await FinancialStats.updateOne(
        {},
        { $inc: { currentBalance: totalRefund } },
        { session }
      );
    }

    // Create transaction record
    await Transaction.create(
      [
        {
          type: "INCOME",
          category: "WRITE_OFF",
          amount: totalRefund,
          reason: `Списание: ${body.reason}`,
          referenceId: writeOff[0]._id,
          date: new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: writeOff[0] },
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
      { success: false, error: "Failed to create write-off" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
