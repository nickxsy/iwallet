import {
  transactionStore,
  type TransactionPartial,
} from "@/entities/transaction";

import { useAppDispatch } from "@/shared/lib";

export const useRemoveTransaction = () => {
  const dispatch = useAppDispatch();

  return async (transaction: TransactionPartial) => {
    await dispatch(transactionStore.actions.removeTransaction(transaction.id));
  };
};
