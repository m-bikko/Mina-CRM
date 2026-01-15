import { z } from "zod";

export const returnItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  sizeLabel: z.string().min(1, "Size label is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  priceAtSale: z.number().min(0, "Price must be positive"),
  costPrice: z.number().min(0, "Cost price must be positive"),
});

export const returnSchema = z.object({
  saleId: z.string().min(1, "Sale ID is required"),
  items: z.array(returnItemSchema).min(1, "Return must have at least one item"),
});

export type ReturnInput = z.infer<typeof returnSchema>;
export type ReturnItemInput = z.infer<typeof returnItemSchema>;
