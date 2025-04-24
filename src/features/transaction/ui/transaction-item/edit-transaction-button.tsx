import { Edit2 } from 'lucide-react';

import { useAppDispatch } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

import {
  TransactionPartial,
  transactionModalStore
} from '@/entities/transaction';

export const EditTransactionButton = ({
  transaction
}: {
  transaction: TransactionPartial;
}) => {
  const dispatch = useAppDispatch();
  const openModal = transactionModalStore.actions.openTransactionModal;
  return (
    <Button
      onClick={() => dispatch(openModal({ transaction }))}
      type="button"
      className="size-10"
      variant="ghost"
    >
      <Edit2 />
    </Button>
  );
};
