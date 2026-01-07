import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import InventoryBatch from "@/models/InventoryBatch";
import Product from "@/models/Product";
import Supply from "@/models/Supply";

// Auto-create missing batches for products with stock but no batch
async function syncMissingBatches(): Promise<number> {
  // Get all products with sizes that have quantity > 0
  const products = await Product.find({
    "sizes.quantity": { $gt: 0 },
  }).lean();

  let createdCount = 0;

  for (const product of products) {
    for (const size of product.sizes) {
      if (size.quantity <= 0) continue;

      // Check if batch already exists for this product/size
      const existingBatch = await InventoryBatch.findOne({
        product: product._id,
        sizeLabel: size.label,
        remainingQuantity: { $gt: 0 },
      });

      if (existingBatch) continue;

      // Look for a supply containing this product/size to get costPrice
      const supply = await Supply.findOne({
        "items.product": product._id,
        "items.sizeLabel": size.label,
      }).lean();

      let costPrice = 0;
      let supplyId = null;

      if (supply) {
        const supplyItem = supply.items.find(
          (item) =>
            item.product.toString() === product._id.toString() &&
            item.sizeLabel === size.label
        );
        if (supplyItem) {
          costPrice = supplyItem.costPrice;
          supplyId = supply._id;
        }
      }

      // Create the batch
      await InventoryBatch.create({
        product: product._id,
        productName: product.name,
        sizeLabel: size.label,
        supply: supplyId,
        costPrice,
        initialQuantity: size.quantity,
        remainingQuantity: size.quantity,
      });

      createdCount++;
    }
  }

  return createdCount;
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();

    // Auto-sync missing batches before returning
    const syncedCount = await syncMissingBatches();
    if (syncedCount > 0) {
      console.log(`Auto-created ${syncedCount} inventory batches for legacy products`);
    }

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
