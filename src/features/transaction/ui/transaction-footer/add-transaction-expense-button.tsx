import { useAppDispatch } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

import {
  TransactionTypeEnum,
  transactionModalStore
} from '@/entities/transaction';

export const AddTransactionExpenceButton = () => {
  const dispatch = useAppDispatch();
  const openModal = transactionModalStore.actions.openTransactionModal;

  return (
    <Button
      onClick={() => dispatch(openModal({ type: TransactionTypeEnum.EXPENSE }))}
      className="flex-1 h-[52px] rounded-full"
    >
      Расход
    </Button>
  );
};
