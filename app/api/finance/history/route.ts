import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments();

    const financialStats = await FinancialStats.findOne();

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        currentBalance: financialStats?.currentBalance || 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch transaction history" },
      { status: 500 }
    );
  }
}
