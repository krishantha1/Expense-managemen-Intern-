"use client";
import { Expense } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseRowAction } from "@/components/(dashboard)/expense/expense.row-actions";
import { SortableHeader } from "@/components/ui/sortable-header";

export const ExpenseColumns: ColumnDef<
  Omit<Expense, "amount"> & { amount: number }
>[] = [
  {
    accessorKey: "whatFor",
    header: ({ column }) => <SortableHeader column={column} title="What For" />,
    cell: ({ row }) => {
      const whatFor = row.getValue("whatFor") as string;
      return <span className="font-medium">{whatFor}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      // Convert Decimal to number for display
      const amountNumber =
        typeof amount === "object" && amount !== null
          ? Number(amount.toString())
          : Number(amount);
      return (
        <span className="font-medium ">LKR {amountNumber.toFixed(2)}</span>
      );
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) => <SortableHeader column={column} title="Note" />,
    cell: ({ row }) => {
      const note = row.getValue("note") as string;
      return (
        <span className="text-sm text-muted-foreground max-w-[200px] truncate">
          {note || "No note"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Created At" />
    ),
    accessorFn: (expense) => expense.createdAt, // For sorting
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return (
        <span>
          {date
            ? new Date(date as string).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Invalid date"}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Updated At" />
    ),
    accessorFn: (expense) => expense.updatedAt, // For sorting
    cell: ({ row }) => {
      const date = row.getValue("updatedAt");
      return (
        <span>
          {date
            ? new Date(date as string).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Invalid date"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ExpenseRowAction {...row} />,
  },
];
