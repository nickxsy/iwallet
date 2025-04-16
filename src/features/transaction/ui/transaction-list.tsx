import { cn } from "@/shared/lib";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

export const TransactionList = ({ className }: { className?: string }) => {
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
      <TabsContent value="all">All</TabsContent>
      <TabsContent value="income">Income</TabsContent>
      <TabsContent value="expense">Expense</TabsContent>
    </Tabs>
  );
};
