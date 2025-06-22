import { z } from "zod";

export const ExpenseSchema = z.object({
  whatFor: z
    .string()
    .min(1, "What for is required")
    .min(2, "What for must be at least 2 characters")
    .max(200, "What for cannot exceed 200 characters")
    .trim(),

  currency: z.enum(["LKR", "AED"]),

  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(999999.99, "Amount cannot exceed 999,999.99"),

  amountInDinar: z.coerce.number().optional(),

  note: z.string().max(1000, "Note cannot exceed 1000 characters").nullable(),

});

export type ExpenseFormObject = z.infer<typeof ExpenseSchema> & {
  id: string;
};
