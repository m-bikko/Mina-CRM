import mongoose, { Types } from "mongoose";
import InventoryBatch from "@/models/InventoryBatch";
import { IBatchAllocation } from "@/models/Sale";

/**
 * Распределяет количество товара по партиям методом FIFO
 * @param productId - ID товара
 * @param sizeLabel - Размер товара
 * @param quantity - Сколько единиц нужно списать
 * @param session - MongoDB сессия для транзакции
 * @returns Массив IBatchAllocation с распределением по партиям
 */
export async function allocateBatches(
  productId: string | Types.ObjectId,
  sizeLabel: string,
  quantity: number,
  session: mongoose.ClientSession
): Promise<IBatchAllocation[]> {
  // 1. Получить все партии с остатками, отсортированные по FIFO
  const batches = await InventoryBatch.find({
    product: productId,
    sizeLabel: sizeLabel,
    remainingQuantity: { $gt: 0 },
  })
    .sort({ createdAt: 1 }) // FIFO: старые первыми
    .session(session);

  // 2. Проверить достаточность товара
  const totalAvailable = batches.reduce(
    (sum, b) => sum + b.remainingQuantity,
    0
  );

  if (totalAvailable < quantity) {
    throw new Error(
      `Недостаточно товара. Доступно: ${totalAvailable}, запрошено: ${quantity}`
    );
  }

  // 3. Распределить по партиям
  const allocations: IBatchAllocation[] = [];
  let remainingToAllocate = quantity;

  for (const batch of batches) {
    if (remainingToAllocate === 0) break;

    const allocatedFromBatch = Math.min(
      batch.remainingQuantity,
      remainingToAllocate
    );

    allocations.push({
      batch: batch._id,
      quantity: allocatedFromBatch,
      costPrice: batch.costPrice,
    });

    // 4. Обновить остаток в партии
    await InventoryBatch.updateOne(
      { _id: batch._id },
      { $inc: { remainingQuantity: -allocatedFromBatch } },
      { session }
    );

    remainingToAllocate -= allocatedFromBatch;
  }

  return allocations;
}
