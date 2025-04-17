import {
  CreateTransactionData,
  transactionStore,
} from "@/entities/transaction";
import { useAppDispatch } from "@/shared/lib";

export const useCreateTransaction = () => {
  const dispatch = useAppDispatch();

  const createTransaction = async (data: CreateTransactionData) => {
    dispatch(transactionStore.actions.createTransaction(data));
  };

  return { createTransaction };
};
