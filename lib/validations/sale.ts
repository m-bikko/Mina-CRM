import { z } from "zod";

export const saleItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  sizeLabel: z.string().min(1, "Size label is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  priceAtSale: z.number().min(0, "Price must be positive"),
});

export const saleSchema = z.object({
  date: z.string().or(z.date()).optional(),
  customerPhone: z.string().min(1, "Customer phone is required"),
  paymentType: z.string().min(1, "Payment type is required"),
  items: z.array(saleItemSchema).min(1, "Sale must have at least one item"),
});

export type SaleInput = z.infer<typeof saleSchema>;
export type SaleItemInput = z.infer<typeof saleItemSchema>;
