"use server";
import { Expense } from "@prisma/client";
import { actionErrorHandler } from "@/lib/utils/action-error-handler";
import prismaClient from "@/lib/utils/prisma-client";
import { ActionResponse } from "@/lib/utils/types";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ReadExpensesParams } from "@/app/(dashboard)/expenses/page";

export const readExpenses = async ({
  cursor,
  direction,
  orderedBy = "id",
  orderDirection = "desc",
}: ReadExpensesParams): Promise<
  ActionResponse<{
    data: (Omit<Expense, "amount"> & { amount: number })[];
    nextCursor: string | null;
    previousCursor: string | null;
  }>
> => {
  try {
    // Ensure the user is authenticated
   
   

    const whereCondition: { userId?: string } = {};

      whereCondition.userId = "123"; // Replace with actual user ID from session or auth context
  

    const orderByConfig = [{ [orderedBy]: orderDirection }];
    if (orderedBy !== "id") {
      orderByConfig.push({ id: "asc" });
    }

    const firstItem = await prismaClient.expense.findFirst({
      where:
        Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
      orderBy: orderByConfig,
    });

    const expenses = await prismaClient.expense.findMany({
      where:
        Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
      take: direction === undefined ? 10 : direction === "next" ? 10 : -10,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: orderByConfig,
    });

    // Convert Decimal to number for amount
    const expensesWithNumberAmount = expenses.map((expense) => ({
      ...expense,
      amount: Number(expense.amount), // Convert Decimal to number
    }));

    revalidatePath("/dashboard/expenses");

    return {
      success: true,
      data: {
        data: expensesWithNumberAmount,
        nextCursor:
          expensesWithNumberAmount.length > 0 &&
          expensesWithNumberAmount.length === 10
            ? expensesWithNumberAmount[expensesWithNumberAmount.length - 1].id
            : null,
        previousCursor:
          cursor &&
          expensesWithNumberAmount.length > 0 &&
          expensesWithNumberAmount[0].id !== firstItem?.id
            ? expensesWithNumberAmount[0].id
            : null,
      },
    };
  } catch (error) {
    return actionErrorHandler<{
      data: (Omit<Expense, "amount"> & { amount: number })[];
      nextCursor: string | null;
      previousCursor: string | null;
    }>(error);
  }
};
