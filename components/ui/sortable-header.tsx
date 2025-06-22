"use client";
import { Button } from "@/components/ui/button";
import {
  Expense,
  VisaApplication,
  VisaPrice,
  VisaSupplier,
} from "@prisma/client";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

type SortableHeaderProps = {
  title: string;
  column:
    | Column<
        Omit<VisaPrice, "price"> & {
          price: number;
        }
      >
    | Column<
        Omit<VisaApplication, "sellPrice" | "buyPrice"> & {
          sellPrice: number;
          buyPrice: number;
          user: {
            firstName: string;
          };
        }
      >
    | Column<VisaSupplier>
    | Column<
        Omit<Expense, "amount"> & {
          amount: number;
        }
      >;
};

export const SortableHeader = ({ title, column }: SortableHeaderProps) => {
  const router = useRouter();

  const [orderedBy] = useQueryState("orderedBy");
  const [orderedDirection] = useQueryState("orderDirection");

  return (
    <Button
      variant="ghost"
      onClick={() => {
        const columnId = column.id;
        router.replace(
          `?orderedBy=${columnId}&orderDirection=${
            orderedBy === columnId && orderedDirection
              ? orderedDirection === "asc"
                ? "desc"
                : "asc"
              : "asc"
          }`
        );
      }}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
