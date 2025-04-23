import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn, useAppSelector } from '@/shared/lib';

import { TransactionTypeEnum } from '@/entities/transaction/model/const';

import { getAllTransactions } from '../model/transaction.selectors';

import { RemoveTransactionButton } from './remove-transaction-button';

export const TransactionList = ({ className }: { className?: string }) => {
  const transactions = useAppSelector(getAllTransactions);

  return (
    <Tabs defaultValue="all" className={cn('w-full', className)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="cursor-pointer border-b-2" value="all">
          Общее
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer " value="income">
          Доход
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer " value="expense">
          Расход
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="py-6">
        {transactions.map(transaction => (
          <div
            className={cn(
              'flex justify-between p-2 border-b',
              transaction.type === TransactionTypeEnum.INCOME &&
                'text-green-600',
              transaction.type === TransactionTypeEnum.EXPENSE && 'text-red-600'
            )}
            key={transaction.id}
          >
            <span>{transaction.amount}</span>
            <span>{transaction.description}</span>
            <RemoveTransactionButton transaction={transaction} />
          </div>
        ))}
      </TabsContent>
      <TabsContent value="income" className="py-6">
        {transactions
          .filter(
            transaction => transaction.type === TransactionTypeEnum.INCOME
          )
          .map(transaction => (
            <div
              className={cn('flex justify-between p-2 border-b text-green-600')}
              key={transaction.id}
            >
              <span>{transaction.amount}</span>
              <span>{transaction.description}</span>
              <RemoveTransactionButton transaction={transaction} />
            </div>
          ))}
      </TabsContent>
      <TabsContent value="expense" className="py-6">
        {transactions
          .filter(
            transaction => transaction.type === TransactionTypeEnum.EXPENSE
          )
          .map(transaction => (
            <div
              className={cn('flex justify-between p-2 border-b text-red-600')}
              key={transaction.id}
            >
              <span>{transaction.amount}</span>
              <span>{transaction.description}</span>
              <RemoveTransactionButton transaction={transaction} />
            </div>
          ))}
      </TabsContent>
    </Tabs>
  );
};
