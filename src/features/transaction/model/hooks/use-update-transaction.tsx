import { useAppDispatch } from '@/shared/lib';

import { transactionStore } from '@/entities/transaction';
import { UpdateTransactionData } from '@/entities/transaction';

export const useUpdateTransaction = () => {
  const dispatch = useAppDispatch();

  const updateTransaction = async (data: UpdateTransactionData) => {
    dispatch(transactionStore.actions.updateTransaction(data));
  };

  return { updateTransaction };
};
