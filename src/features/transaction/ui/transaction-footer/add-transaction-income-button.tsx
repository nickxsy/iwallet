import { useAppDispatch } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

import {
  TransactionTypeEnum,
  transactionModalStore
} from '@/entities/transaction';

export const AddTransactionIncomeButton = () => {
  const dispatch = useAppDispatch();
  const openModal = transactionModalStore.actions.openTransactionModal;

  return (
    <Button
      onClick={() => dispatch(openModal({ type: TransactionTypeEnum.INCOME }))}
      className="h-[52px] flex-1 rounded-full"
    >
      Доход
    </Button>
  );
};
