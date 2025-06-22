"use server";
import { ActionResponse, Override } from "@/lib/utils/types";
import prismaClient from "@/lib/utils/prisma-client";
import { actionErrorHandler } from "@/lib/utils/action-error-handler";
import { ExpenseSchema } from "@/lib/schema/expense.schema";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { headers } from "next/headers";

export type ExpenseCreateInput = Override<
  Omit<Prisma.ExpenseCreateInput, "userId" | "user">,
  {
    amount: number;
    amountInDinar?: number;
  }
>;

export const createExpense = async (
  data: ExpenseCreateInput
): Promise<ActionResponse> => {
  try {
    // Ensure the user is authenticated


 

    ExpenseSchema.parse(data);

    // Create the expense with the original Prisma data
    await prismaClient.expense.create({
      data: {
        ...data,
        userId: "123", // Replace with actual user ID from session or auth context
      },
    });

    // revalidate cached data
    revalidatePath("/expenses");

    return { success: true, data: null };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
