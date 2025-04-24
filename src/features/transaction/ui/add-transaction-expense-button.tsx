import { useAppSelector } from '@/shared/lib';

import { getTransactionTotalExpense } from '../model/transaction.selectors';

export const AddTransactionExpenceButton = () => {
  const totalExpense = useAppSelector(getTransactionTotalExpense);

  return (
    <button
      type="button"
      className="w-full cursor-pointer text-center p-3.5 rounded-3xl  bg-gray-50 text-red-600"
    >
      <span className="block">Расход</span>
      <span className="block w-full">{totalExpense} руб.</span>
    </button>
  );
};
