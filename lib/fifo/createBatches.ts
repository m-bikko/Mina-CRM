import mongoose, { Types } from "mongoose";
import InventoryBatch from "@/models/InventoryBatch";

interface ISupplyItem {
  product: string | Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  costPrice: number;
}

/**
 * Создает партии товара при завозе
 * @param supplyId - ID завоза
 * @param items - Позиции завоза
 * @param session - MongoDB сессия
 */
export async function createBatches(
  supplyId: Types.ObjectId,
  items: ISupplyItem[],
  session: mongoose.ClientSession
): Promise<void> {
  const batches = items.map((item) => ({
    product: item.product,
    productName: item.productName,
    sizeLabel: item.sizeLabel,
    supply: supplyId,
    costPrice: item.costPrice,
    initialQuantity: item.quantity,
    remainingQuantity: item.quantity, // Изначально вся партия доступна
  }));

  await InventoryBatch.create(batches, { session, ordered: true });
}
