import { Trash } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { TransactionPartial } from '@/entities/transaction';

import { useRemoveTransaction } from '../../model/hooks/use-remove-transaction';

export const RemoveTransactionButton = ({
  transaction
}: {
  transaction: TransactionPartial;
}) => {
  const removeTransaction = useRemoveTransaction();

  return (
    <Button
      type="button"
      className="size-10"
      onClick={() => removeTransaction(transaction)}
      variant="ghost"
    >
      <Trash />
    </Button>
  );
};
