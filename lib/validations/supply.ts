import { z } from "zod";

export const supplyItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  sizeLabel: z.string().min(1, "Size label is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  costPrice: z.number().min(0, "Cost price must be positive"),
});

export const supplySchema = z.object({
  date: z.string().or(z.date()).optional(),
  items: z
    .array(supplyItemSchema)
    .min(1, "Supply must have at least one item"),
});

export type SupplyInput = z.infer<typeof supplySchema>;
export type SupplyItemInput = z.infer<typeof supplyItemSchema>;
