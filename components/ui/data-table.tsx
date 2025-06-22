"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useQueryState, parseAsString } from "nuqs";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultHiddenColumns?: string[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  defaultHiddenColumns = [],
}: DataTableProps<TData, TValue>) => {
  const getDefaultColumnVisibility = (): VisibilityState => {
    const visibility: VisibilityState = {};
    defaultHiddenColumns.forEach((columnId) => {
      visibility[columnId] = false;
    });
    return visibility;
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getDefaultColumnVisibility()
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  // Manage filter column and value using URL search parameters
  const [filterColumn, setFilterColumn] = useQueryState(
    "filterColumn",
    parseAsString // Initialize with null if not in URL, or the string value from URL
  );
  const [filterValue, setFilterValue] = useQueryState(
    "filterValue",
    parseAsString.withDefault("") // Default to empty string
  );

  // Ensure filterColumn is valid if it exists in the URL
  useEffect(() => {
    const allTableColumns = table.getAllColumns();
    if (allTableColumns.length === 0 || !filterColumn) {
      // Columns not ready yet, or no filterColumn in URL to validate
      return;
    }

    const allColumnIds = allTableColumns.map((col) => col.id);

    // If filterColumn is in the URL but it's an invalid ID, reset it or set to a valid default.
    // For now, let's just clear it if invalid, or you could set it to the first valid one.
    // To simply remove an invalid one:
    if (!allColumnIds.includes(filterColumn)) {
      // Option 1: Clear the invalid filterColumn from URL
      setFilterColumn(null, { history: "replace" });
      // Option 2: Or, set to the first valid column if an invalid one was in the URL
      // const firstValidColumnId = allColumnIds[0];
      // if (firstValidColumnId) {
      //   setFilterColumn(firstValidColumnId, { history: "replace" });
      // }
    }
  }, [table, filterColumn, setFilterColumn]);

  const { replace } = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          {table.getAllColumns().length > 0 && (
            <div>
              <Select
                value={filterColumn || ""}
                onValueChange={(value) => {
                  setFilterColumn(value);
                  setFilterValue(null);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  {table.getAllColumns().map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.id
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {filterColumn && (
            <div>
              <Input
                placeholder={`Filter by ${filterColumn
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}`}
                className="max-w-sm"
                value={filterValue || ""}
                onChange={(e) => {
                  setFilterValue(e.target.value || null);
                  replace(
                    `?filterColumn=${filterColumn}&filterValue=${
                      e.target.value || ""
                    }`
                  );
                }}
              />
            </div>
          )}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
