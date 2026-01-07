import { IBatchAllocation } from "@/models/Sale";

/**
 * Вычисляет общую себестоимость из распределения по партиям
 */
export function calculateTotalCost(
  allocations: IBatchAllocation[]
): number {
  return allocations.reduce(
    (sum, allocation) => sum + allocation.quantity * allocation.costPrice,
    0
  );
}
