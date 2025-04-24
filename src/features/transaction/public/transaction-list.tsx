import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn } from '@/shared/lib';

import {
  getExpenseGroupedTransactions,
  getIncomeGroupedTransactions
} from '../model/transaction.selectors';
import { TransactionGrouped } from '../ui/transaction-list/transaction-grouped';

type TransactionTabs = {
  trigger: string;
  value: 'all' | 'income' | 'expense';
  selector?: any;
};

const tabs: TransactionTabs[] = [
  {
    trigger: 'Все',
    value: 'all'
  },
  {
    trigger: 'Доход',
    value: 'income',
    selector: getIncomeGroupedTransactions
  },
  {
    trigger: 'Расход',
    value: 'expense',
    selector: getExpenseGroupedTransactions
  }
];

export const TransactionList = ({ className }: { className?: string }) => {
  return (
    <Tabs defaultValue="all" className={cn('w-full', className)}>
      <TabsList className="grid w-full border-b-2 border-b-gray-200 grid-cols-3">
        {tabs.map(tab => (
          <TabsTrigger
            className="cursor-pointer -mb-[2px] font-semibold text-xs uppercase py-3 transition-all duration-300 border-b-2 border-transparent hover:bg-zinc-100 data-[state='active']:border-b-black data-[state='active']:pointer-events-none"
            value={tab.value}
            key={tab.value}
          >
            {tab.trigger}
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
