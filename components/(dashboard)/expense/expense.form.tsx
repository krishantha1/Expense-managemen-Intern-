"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExpenseFormObject, ExpenseSchema } from "@/lib/schema/expense.schema";
import { AppFormProps } from "@/lib/utils/types";
import { FormSubmit } from "@/components/(dashboard)/form-submit";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCreateInput } from "@/lib/actions/expense/create-expense";

import { ExpenseUpdateInput } from "@/lib/actions/expense/update-expense";

export const ExpenseForm = (
  props: AppFormProps<ExpenseCreateInput, ExpenseUpdateInput, ExpenseFormObject>
) => {
  // Get the current user from the session

  const router = useRouter();

  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      whatFor: props.formType !== "create" ? props.formObject?.whatFor : "",
      currency:
        props.formType !== "create" ? props.formObject?.currency : "LKR",
      amount: props.formType !== "create" ? props.formObject.amount || 0 : 0,
      amountInDinar:
        props.formType !== "create" ? props.formObject?.amountInDinar || 0 : 0,
      note: props.formType !== "create" ? props.formObject?.note || "" : "",
    },
  });

  const watchedCurrency = form.watch("currency");

  const handleSubmit = async () => {
    // Check if the form is valid
    const isValid = await form.trigger();
    if (!isValid) return;

    // Get the form values
    const values = form.getValues();

    if (props.formType === "create") {
      const response = await props.handleCreate(values);
      console.log(response);
      if (response.success) {
        form.reset();
        // redirect to the expenses page
        router.push("/expenses");
      } else {
        //set form status to error
      }
    }

    if (props.formType === "update") {
      const response = await props.handleUpdate(props.formObject.id, values);
      console.log(response);
      if (response.success) {
        // redirect to the expenses page
        router.push("/expenses");
      } else {
        //set form status to error
      }
    }
  };

  return (
    <Form {...form}>
      <form action={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="whatFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What For</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., Office supplies, Travel expenses, Equipment"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LKR">LKR</SelectItem>

                  {/* Add more currency options here if needed */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount Field (LKR or AED) */}
        {(watchedCurrency === "LKR" || watchedCurrency === "AED") && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (LKR)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Price in Dinar Field (AED only) - This is the "price in diar" field */}
        {watchedCurrency === "AED" && (
          <FormField
            control={form.control}
            name="amountInDinar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price in Dinar (AED)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Note (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Any additional details about this expense..."
                  rows={3}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSubmit>
          {props.formType === "create" ? "Create Expense" : "Update Expense"}
        </FormSubmit>
      </form>
    </Form>
  );
};
