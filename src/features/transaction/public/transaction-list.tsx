import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn, useAppSelector } from '@/shared/lib';

import { TransactionPartial } from '@/entities/transaction';

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
  labelSelector?: (state: unknown) => number;
  value: 'all' | 'income' | 'expense';
  selector?: (state: unknown) => Record<string, TransactionPartial[]>;
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
  selector?: (state: unknown) => number;
}) => {
  const amount = useAppSelector(selector || getTransactionTotalBalance);
  const balance = useAppSelector(getTransactionTotalBalance);

  return (
    <div className="flex flex-col items-center align-top">
      <span>{label}</span>
      {!!Math.abs(+balance) && <span>{amount} ₽</span>}
    </div>
  );
};

export const TransactionList = ({ className }: { className?: string }) => {
  return (
    <Tabs defaultValue="all" className={cn('w-full', className)}>
      <TabsList className="grid w-full grid-cols-3 border-b-2 border-b-gray-200">
        {tabs.map(tab => (
          <TabsTrigger
            className="-mb-[2px] flex cursor-pointer justify-center border-b-2 border-transparent py-3 text-xs font-semibold uppercase transition-all duration-300 hover:bg-zinc-100 data-[state='active']:pointer-events-none data-[state='active']:border-b-black"
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
            className="flex flex-col gap-2 py-6"
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
