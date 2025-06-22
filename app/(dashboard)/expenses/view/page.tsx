import { PageContainer } from "@/components/(dashboard)/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prismaClient from "@/lib/utils/prisma-client";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const ViewExpensePage = async ({
  searchParams,
}: {
  searchParams: { id?: string };
}) => {
  const { id } = searchParams;

  if (!id) {
    notFound();
  }

  const expense = await prismaClient.expense.findUnique({
    where: { id },
  });

  if (!expense) {
    notFound();
  }

  return (
    <PageContainer title="Expense Details" pageType="form">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/expenses">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Expenses
                </Link>
              </Button>
              <h2 className="text-2xl font-bold">{expense.whatFor}</h2>
            </div>
            <Button asChild>
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
                <Edit className="h-4 w-4 mr-2" />
                Edit Expense
              </Link>
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                What For
              </h3>
              <p className="text-lg">{expense.whatFor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Amount
              </h3>
              <p className="text-lg font-semibold text-green-600">
                ${expense.amount.toFixed(2)}
              </p>
            </div>
          </div>

          {expense.note && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Additional Note
              </h3>
              <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                {expense.note}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Created At
              </h3>
              <p className="text-sm">
                {expense.createdAt.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Updated At
              </h3>
              <p className="text-sm">
                {expense.updatedAt.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ViewExpensePage;
