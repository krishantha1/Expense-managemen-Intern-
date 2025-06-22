import { ExpenseTable } from "@/components/(dashboard)/expense/expense.table";
import { PageContainer } from "@/components/(dashboard)/layout/page-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Expense } from "@prisma/client";
import Link from "next/link";

export type ReadExpensesParams = {
  cursor?: string;
  direction?: "next" | "prev";
  orderedBy?: keyof Expense;
  orderDirection?: "asc" | "desc";
  filterColumn?: Omit<keyof Expense, "amount" | "note">;
  filterValue?: string;
};

const ExpensesPage = async ({
  searchParams,
}: {
  searchParams: ReadExpensesParams;
}) => {
  return (
    <PageContainer title="Expenses" pageType="table">
      <Card>
        {/* table header */}
        <CardHeader>
          <div className="flex justify-between">
            <div>{/* <Input placeholder="Search categories" /> */}</div>
            <div>
              <Button asChild>
                <Link href="/expenses/create">Create Expense</Link>
              </Button>
            </div>
          </div>
          <div className="h-2"></div>
          <Separator />
        </CardHeader>
        {/* table */}
        <CardContent>
          <ExpenseTable {...searchParams} />
        </CardContent>
        {/* table footer */}
        <CardFooter></CardFooter>
      </Card>
    </PageContainer>
  );
};

export default ExpensesPage;
