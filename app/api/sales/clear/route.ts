import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Sale from "@/models/Sale";
import Transaction from "@/models/Transaction";

export async function DELETE(): Promise<NextResponse> {
  try {
    await connectDB();

    // Удаляем все продажи
    const deleteResult = await Sale.deleteMany({});

    // Удаляем все транзакции связанные с продажами
    await Transaction.deleteMany({ category: "SALE" });

    return NextResponse.json({
      success: true,
      message: `Удалено ${deleteResult.deletedCount} продаж и связанных транзакций`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error clearing sales:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear sales" },
      { status: 500 }
    );
  }
}
