import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body = await request.json();
    const { productIds } = body;

    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { success: false, error: "productIds must be an array" },
        { status: 400 }
      );
    }

    // Update sortOrder for each product based on position in array
    const updatePromises = productIds.map((id: string, index: number) =>
      Product.findByIdAndUpdate(id, { sortOrder: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to reorder products" },
      { status: 500 }
    );
  }
}
