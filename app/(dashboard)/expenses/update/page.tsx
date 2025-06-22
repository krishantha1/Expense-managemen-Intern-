import { ExpenseForm } from "@/components/(dashboard)/expense/expense.form";
import { PageContainer } from "@/components/(dashboard)/layout/page-container";
import { updateExpense } from "@/lib/actions/expense/update-expense";

import { ExpenseFormObject } from "@/lib/schema/expense.schema";
import prismaClient from "@/lib/utils/prisma-client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const UpdateExpensePage = async ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const expense = await prismaClient.expense.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  if (!expense) {
    notFound();
  }

  //transform expense data into serializable format
  const transformedExpense: ExpenseFormObject = {
    id: expense.id,
    whatFor: expense.whatFor,
    currency: expense.currency,
    amount: Number(expense.amount),
    amountInDinar: Number(expense.amountInDinar),

    note: expense.note,
  };

  return (
    <PageContainer title="Update Expense" pageType="form">
      <ExpenseForm
        formType="update"
        handleUpdate={updateExpense}
        formObject={transformedExpense}
      />
    </PageContainer>
  );
};

export default UpdateExpensePage;
