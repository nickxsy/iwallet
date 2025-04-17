import { transactionStore } from "@/entities/transaction";
import { cn, useAppSelector } from "@/shared/lib";

export const TotalTransaction = () => {
  const balance = useAppSelector(
    transactionStore.selectors.selectTransactionBalance
  );
  const totalIncome = useAppSelector(
    transactionStore.selectors.selectTransactionTotalIncome
  );
  const totalExpense = useAppSelector(
    transactionStore.selectors.selectTransactionTotalExpense
  );

  return (
    <div className="flex flex-col py-12">
      <div
        className={cn(
          "flex justify-center",
          balance > 1 ? "text-green-600" : "text-red-600",
          balance === 0 && "text-black"
        )}
      >
        <span className="relative">
          <span className="text-8xl font-black">{balance}</span>
          <span className="absolute text-4xl top-2 right-0 translate-x-[100%] font-black opacity-20">
            $
          </span>
        </span>
      </div>

      <div className="flex gap-1.5 py-4">
        <div className="w-full text-center p-3.5 rounded-3xl  bg-gray-50 text-green-600">
          <span className="block">Income</span>
          <span className="block w-full">${totalIncome}</span>
        </div>
        <div className="w-full text-center p-3.5 rounded-3xl  bg-gray-50 text-red-600">
          <span className="block">Expense</span>
          <span className="block w-full">${totalExpense}</span>
        </div>
      </div>
    </div>
  );
};
