import { Button } from "@/shared/ui/button";
import { useRemoveTransaction } from "../model/use-remove-transaction";
import { TransactionPartial } from "@/entities/transaction";

export const RemoveTransactionButton = ({
  transaction,
}: {
  transaction: TransactionPartial;
}) => {
  const removeTransaction = useRemoveTransaction();

  return (
    <Button onClick={() => removeTransaction(transaction)} variant="outline">
      Remove
    </Button>
  );
};
