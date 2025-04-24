import { useAppDispatch, useAppSelector } from '@/shared/lib';

import {
  TransactionTypeEnum,
  transactionModalStore
} from '@/entities/transaction';

import { getTransactionTotalIncome } from '../../model/transaction.selectors';

export const AddTransactionIncomeButton = () => {
  const totalIncome = useAppSelector(getTransactionTotalIncome);

  const dispatch = useAppDispatch();
  const openModal = transactionModalStore.actions.openTransactionModal;

  return (
    <button
      onClick={() => dispatch(openModal({ type: TransactionTypeEnum.INCOME }))}
      className="w-full text-center cursor-pointer  p-3.5 rounded-3xl  bg-gray-50 text-green-600"
    >
      <span className="block">Доход</span>
      <span className="block w-full">{totalIncome} руб.</span>
    </button>
  );
};
