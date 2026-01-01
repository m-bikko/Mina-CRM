import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import InventoryBatch from "@/models/InventoryBatch";
import "@/models/Supply"; // Needed for populate

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();

    // Get all batches with remaining quantity > 0
    const batches = await InventoryBatch.find({ remainingQuantity: { $gt: 0 } })
      .populate("supply", "date")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: batches });
  } catch (error) {
    console.error("Error fetching inventory batches:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inventory batches" },
      { status: 500 }
    );
  }
}
