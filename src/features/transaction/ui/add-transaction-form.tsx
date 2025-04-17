import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddTransactionIncomeButton } from "./add-transaction-income-button";
import { AddTransactionExpenseButton } from "./add-transaction-expense-button";
import { useCreateTransaction } from "../model/use-create-transaction";
import { TransactionTypeEnum } from "@/entities/transaction/model/const";
import { Switch } from "@/shared/ui/switch";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.nativeEnum(TransactionTypeEnum),
});

export const AddIncomeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      type: TransactionTypeEnum.EXPENSE,
    },
  });

  const { createTransaction } = useCreateTransaction();

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    createTransaction(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="$0.00" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Buy T-shirt" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value === TransactionTypeEnum.INCOME}
                  onCheckedChange={(checked) =>
                    field.onChange(
                      checked
                        ? TransactionTypeEnum.INCOME
                        : TransactionTypeEnum.EXPENSE
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <AddTransactionExpenseButton />
          <AddTransactionIncomeButton />
        </div>
      </form>
    </Form>
  );
};
