import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export const AddTransactionExpenseButton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Button className={cn(className)} type="submit">
      Expense -
    </Button>
  );
};
