import { useAppDispatch } from '@/shared/lib';

import {
  type TransactionPartial,
  transactionStore
} from '@/entities/transaction';

export const useRemoveTransaction = () => {
  const dispatch = useAppDispatch();

  return async (transaction: TransactionPartial) => {
    await dispatch(transactionStore.actions.removeTransaction(transaction.id));
  };
};
