import { DataTable } from "@/components/ui/data-table";
import { readExpenses } from "@/lib/actions/expense/read-expenses";
import { ExpenseColumns } from "@/components/(dashboard)/expense/expense.columns";
import { PaginationControl } from "@/components/ui/pagination-control";
import { ReadExpensesParams } from "@/app/(dashboard)/expenses/page";

export const ExpenseTable = async ({
  cursor,
  direction,
  orderedBy,
  orderDirection,
  filterColumn,
  filterValue,
}: ReadExpensesParams) => {
  // fetch expenses
  const expenses = await readExpenses({
    cursor,
    direction,
    orderedBy,
    orderDirection,
    filterColumn,
    filterValue,
  });

  return (
    <div>
      <DataTable
        columns={ExpenseColumns}
        data={expenses.success ? expenses.data.data : []}
      />
      <PaginationControl
        entity="expenses"
        nextCursor={expenses.success ? expenses.data.nextCursor : null}
        previousCursor={expenses.success ? expenses.data.previousCursor : null}
      />
    </div>
  );
};
