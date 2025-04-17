import { transactionStore } from "@/entities/transaction";
import { cn, useAppSelector } from "@/shared/lib";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { RemoveTransactionButton } from "./remove-transaction-button";
import { TransactionTypeEnum } from "@/entities/transaction/model/const";

export const TransactionList = ({ className }: { className?: string }) => {
  const transactions = useAppSelector(
    transactionStore.selectors.selectTransactions
  );

  return (
    <Tabs defaultValue="all" className={cn("w-full", className)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="border cursor-pointer rounded-2xl" value="all">
          All
        </TabsTrigger>
        <TabsTrigger
          className="border cursor-pointer rounded-2xl"
          value="income"
        >
          Income
        </TabsTrigger>
        <TabsTrigger
          className="border cursor-pointer rounded-2xl"
          value="expense"
        >
          Expense
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {transactions.map((transaction) => (
          <div
            className={cn(
              "flex justify-between p-2 border-b",
              transaction.type === TransactionTypeEnum.INCOME &&
                "text-green-600",
              transaction.type === TransactionTypeEnum.EXPENSE && "text-red-600"
            )}
            key={transaction.id}
          >
            <span>{transaction.amount}</span>
            <span>{transaction.description}</span>
            <RemoveTransactionButton transaction={transaction} />
          </div>
        ))}
      </TabsContent>
      <TabsContent value="income">
        {transactions
          .filter(
            (transaction) => transaction.type === TransactionTypeEnum.INCOME
          )
          .map((transaction) => (
            <div
              className={cn("flex justify-between p-2 border-b text-green-600")}
              key={transaction.id}
            >
              <span>{transaction.amount}</span>
              <span>{transaction.description}</span>
              <RemoveTransactionButton transaction={transaction} />
            </div>
          ))}
      </TabsContent>
      <TabsContent value="expense">
        {transactions
          .filter(
            (transaction) => transaction.type === TransactionTypeEnum.EXPENSE
          )
          .map((transaction) => (
            <div
              className={cn("flex justify-between p-2 border-b text-red-600")}
              key={transaction.id}
            >
              <span>{transaction.amount}</span>
              <span>{transaction.description}</span>
              <RemoveTransactionButton transaction={transaction} />
            </div>
          ))}
      </TabsContent>
    </Tabs>
  );
};
