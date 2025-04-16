import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export const AddTransactionIncomeButton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Button className={cn(className)} type="submit">
      Income +
    </Button>
  );
};
