import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";
import Sale from "@/models/Sale";
import Supply from "@/models/Supply";
import InventoryBatch from "@/models/InventoryBatch";
import Transaction from "@/models/Transaction";
import FinancialStats from "@/models/FinancialStats";
import PaymentType from "@/models/PaymentType";

export async function DELETE(): Promise<NextResponse> {
  try {
    await connectDB();

    await Promise.all([
      Product.deleteMany({}),
      Sale.deleteMany({}),
      Supply.deleteMany({}),
      InventoryBatch.deleteMany({}),
      Transaction.deleteMany({}),
      FinancialStats.deleteMany({}),
      PaymentType.deleteMany({}),
    ]);

    return NextResponse.json({
      success: true,
      message: "База данных очищена",
    });
  } catch (error) {
    console.error("Error clearing database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear database" },
      { status: 500 }
    );
  }
}
