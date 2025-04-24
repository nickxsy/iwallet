import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn, useAppSelector } from '@/shared/lib';

import {
  getExpenseGroupedTransactions,
  getIncomeGroupedTransactions,
  getTransactionTotalBalance,
  getTransactionTotalExpense,
  getTransactionTotalIncome
} from '../model/transaction.selectors';
import { TransactionGrouped } from '../ui/transaction-list/transaction-grouped';

type TransactionTabs = {
  label: string;
  labelSelector?: any;
  value: 'all' | 'income' | 'expense';
  selector?: any;
};

const tabs: TransactionTabs[] = [
  {
    label: 'Все',
    value: 'all'
  },
  {
    label: 'Доход',
    labelSelector: getTransactionTotalIncome,
    value: 'income',
    selector: getIncomeGroupedTransactions
  },
  {
    label: 'Расход',
    labelSelector: getTransactionTotalExpense,
    value: 'expense',
    selector: getExpenseGroupedTransactions
  }
];

const TransactionTrigger = ({
  label,
  selector
}: {
  label: string;
  selector?: (state: unknown) => string;
}) => {
  const amount = useAppSelector(selector || getTransactionTotalBalance);
  const balance = useAppSelector(getTransactionTotalBalance);

  return (
    <div className="flex items-center align-top flex-col">
      <span>{label}</span>
      {!!Math.abs(+balance) && <span>{amount} руб.</span>}
    </div>
  );
};

export const TransactionList = ({ className }: { className?: string }) => {
  return (
    <Tabs defaultValue="all" className={cn('w-full', className)}>
      <TabsList className="grid w-full border-b-2 border-b-gray-200 grid-cols-3">
        {tabs.map(tab => (
          <TabsTrigger
            className="cursor-pointer flex justify-center -mb-[2px] font-semibold text-xs uppercase py-3 transition-all duration-300 border-b-2 border-transparent hover:bg-zinc-100 data-[state='active']:border-b-black data-[state='active']:pointer-events-none"
            value={tab.value}
            key={tab.value}
          >
            <TransactionTrigger
              label={tab.label}
              selector={tab.labelSelector}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      <>
        {tabs.map(tab => (
          <TabsContent
            className="py-6 gap-2 flex flex-col"
            value={tab.value}
            key={tab.value}
          >
            <TransactionGrouped selector={tab.selector} />
          </TabsContent>
        ))}
      </>
    </Tabs>
  );
};
