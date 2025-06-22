import { ExpenseForm } from "@/components/(dashboard)/expense/expense.form";
import { PageContainer } from "@/components/(dashboard)/layout/page-container";
import { createExpense } from "@/lib/actions/expense/create-expense";

const CreateExpensePage = () => {
  return (
    <PageContainer title="Create Expense" pageType="form">
      <ExpenseForm formType="create" handleCreate={createExpense} />
      <div></div>
    </PageContainer>
  );
};

export default CreateExpensePage;
