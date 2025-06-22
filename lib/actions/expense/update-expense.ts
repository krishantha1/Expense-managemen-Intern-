"use server";
import { ActionResponse, Override } from "@/lib/utils/types";
import prismaClient from "@/lib/utils/prisma-client";
import { actionErrorHandler } from "@/lib/utils/action-error-handler";
import { ExpenseSchema } from "@/lib/schema/expense.schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { headers } from "next/headers";

export type ExpenseUpdateInput = Override<
  Omit<Prisma.ExpenseUpdateInput, "userId" | "user">,
  {
    amount: number;
    amountInDinar?: number;
  }
>;

export const updateExpense = async (
  id: string,
  data: ExpenseUpdateInput
): Promise<ActionResponse> => {
  try {
    // Ensure the user is authenticated
  

   

    ExpenseSchema.parse(data);

    // Update the expense with the original Prisma data
    await prismaClient.expense.update({
      where: {
        id,
        userId: "123", // Replace with actual user ID from session or auth context
      },
      data: data,
    });

    // revalidate cached data
    revalidatePath("/expenses");

    return { success: true, data: null };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
