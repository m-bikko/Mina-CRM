import { z } from "zod";

export const financeAdjustmentSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  reason: z.string().min(1, "Reason is required"),
});

export type FinanceAdjustmentInput = z.infer<typeof financeAdjustmentSchema>;
