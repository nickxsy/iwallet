import { useAppSelector } from '@/shared/lib';

import { getTransactionTotalIncome } from '../model/transaction.selectors';

export const AddTransactionIncomeButton = () => {
  const totalIncome = useAppSelector(getTransactionTotalIncome);

  return (
    <button className="w-full text-center cursor-pointer  p-3.5 rounded-3xl  bg-gray-50 text-green-600">
      <span className="block">Доход</span>
      <span className="block w-full">${totalIncome}</span>
    </button>
  );
};
