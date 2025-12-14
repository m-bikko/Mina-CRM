import { z } from "zod";

export const measurementSchema = z.object({
  parameterName: z.string().min(1, "Parameter name is required"),
  value: z.string().min(1, "Value is required"),
});

export const sizeSchema = z.object({
  label: z.string().min(1, "Size label is required"),
  measurements: z.array(measurementSchema).default([]),
  quantity: z.number().min(0, "Quantity must be 0 or greater").default(0),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  images: z.array(z.string().url()).default([]),
  sizes: z.array(sizeSchema).default([]),
  isActive: z.boolean().default(true),
});

export const productUpdateSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
