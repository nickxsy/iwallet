import { useAppDispatch } from '@/shared/lib';

import {
  CreateTransactionData,
  transactionStore
} from '@/entities/transaction';

export const useCreateTransaction = () => {
  const dispatch = useAppDispatch();

  const createTransaction = async (data: CreateTransactionData) => {
    dispatch(transactionStore.actions.createTransaction(data));
  };

  return { createTransaction };
};
