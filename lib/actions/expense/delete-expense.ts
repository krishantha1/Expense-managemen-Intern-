"use server";
import { ActionResponse } from "@/lib/utils/types";
import { actionErrorHandler } from "@/lib/utils/action-error-handler";
import prismaClient from "@/lib/utils/prisma-client";
import { revalidatePath } from "next/cache";

import { headers } from "next/headers";

export const deleteExpense = async (id: string): Promise<ActionResponse> => {
  try {
    // Ensure the user is authenticated

 
    await prismaClient.expense.delete({
      where: {
        id,
        userId: "123", // Replace with actual user ID from session or auth context
      },
    });

    // revalidate cached data
    revalidatePath("/expenses");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
