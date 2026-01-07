import { z } from "zod";

export const paymentTypeSchema = z.object({
  name: z.string().min(1, "Payment type name is required"),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0 and 100"),
  bankCommissionRate: z.number().min(0).max(100, "Bank commission rate must be between 0 and 100").default(0),
});

export type PaymentTypeInput = z.infer<typeof paymentTypeSchema>;
