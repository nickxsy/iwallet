import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn, useAppSelector } from '@/shared/lib';

import { TransactionPartial } from '@/entities/transaction';
import { TransactionTypeEnum } from '@/entities/transaction';

import { getAllTransactions } from '../model/transaction.selectors';

import { TransactionItem } from './transaction-item';

type TransactionTabs = {
  trigger: string;
  value: 'all' | 'income' | 'expense';
  children: (transactions: TransactionPartial[]) => React.ReactNode;
};

const tabs: TransactionTabs[] = [
  {
    trigger: 'Все',
    value: 'all',
    children: transactions =>
      transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))
  },
  {
    trigger: 'Доход',
    value: 'income',
    children: transactions =>
      transactions
        .filter(transaction => transaction.type === TransactionTypeEnum.INCOME)
        .map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))
  },
  {
    trigger: 'Расход',
    value: 'expense',
    children: transactions =>
      transactions
        .filter(transaction => transaction.type === TransactionTypeEnum.EXPENSE)
        .map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))
  }
];

export const TransactionList = ({ className }: { className?: string }) => {
  const transactions = useAppSelector(getAllTransactions);

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
            children={tab.children(transactions)}
          />
        ))}
      </>
    </Tabs>
  );
};
