import { useAppDispatch, useAppSelector } from '@/shared/lib';

import {
  TransactionTypeEnum,
  transactionModalStore
} from '@/entities/transaction';

import { getTransactionTotalExpense } from '../../model/transaction.selectors';

export const AddTransactionExpenceButton = () => {
  const totalExpense = useAppSelector(getTransactionTotalExpense);
  const dispatch = useAppDispatch();
  const openModal = transactionModalStore.actions.openTransactionModal;

  return (
    <button
      onClick={() => dispatch(openModal({ type: TransactionTypeEnum.EXPENSE }))}
      className="w-full cursor-pointer text-center p-3.5 rounded-3xl  bg-gray-50 text-red-600"
    >
      <span className="block">Расход</span>
      <span className="block w-full">{totalExpense} руб.</span>
    </button>
  );
};
