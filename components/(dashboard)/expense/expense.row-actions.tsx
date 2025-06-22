import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Expense } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const ExpenseRowAction = (
  row: Row<
    Omit<Expense, "amount"> & {
      amount: number;
    }
  >
) => {
  const expense = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={{
              pathname: "/expenses/view",
              query: { id: expense.id },
            }}
          >
            View Expense
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={{
              pathname: "/expenses/update",
              query: {
                id: expense.id,
                whatFor: expense.whatFor,
                amount: expense.amount.toString(),
                note: expense.note || "",
                createdAt: expense.createdAt.toString(),
                updatedAt: expense.updatedAt.toString(),
              },
            }}
          >
            Update Expense
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Link
            href={{
              pathname: "/expenses/delete",
              query: {
                id: expense.id,
                whatFor: expense.whatFor,
                amount: expense.amount.toString(),
                createdAt: expense.createdAt.toString(),
                updatedAt: expense.updatedAt.toString(),
              },
            }}
          >
            Delete Expense
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
