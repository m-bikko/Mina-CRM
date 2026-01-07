import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import { financeAdjustmentSchema } from "@/lib/validations/finance";
import mongoose from "mongoose";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectDB();

    const body = await request.json();
    const validatedData = financeAdjustmentSchema.parse(body);

    const financialStats = await FinancialStats.findOne().session(session);

    if (!financialStats) {
      const initialBalance =
        validatedData.type === "INCOME"
          ? validatedData.amount
          : -validatedData.amount;
      await FinancialStats.create(
        [{ currentBalance: initialBalance }],
        { session }
      );
    } else {
      const adjustment =
        validatedData.type === "INCOME"
          ? validatedData.amount
          : -validatedData.amount;
      await FinancialStats.updateOne(
        {},
        { $inc: { currentBalance: adjustment } },
        { session }
      );
    }

    const transaction = await Transaction.create(
      [
        {
          type: validatedData.type,
          category: "MANUAL_ADJUSTMENT",
          amount: validatedData.amount,
          reason: validatedData.reason,
          date: new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: transaction[0] },
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
      { success: false, error: "Failed to create adjustment" },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
