import { cn } from '@/shared/lib';

import {
  type TransactionPartial,
  TransactionTypeEnum
} from '@/entities/transaction';

import { EditTransactionButton } from './edit-transaction-button';
import { RemoveTransactionButton } from './remove-transaction-button';

export const TransactionItem = ({
  transaction
}: {
  transaction: TransactionPartial;
}) => {
  return (
    <div
      className="flex justify-between p-4 rounded-2xl bg-gray-100"
      key={transaction.id}
    >
      <div className="flex gap-2  w-full">
        <div className="flex flex-col flex-none">
          <span
            className={cn(
              'font-bold',
              transaction.type === TransactionTypeEnum.INCOME
                ? 'text-green-600'
                : 'text-red-600'
            )}
          >
            <span>
              {transaction.type === TransactionTypeEnum.INCOME ? '+' : '-'}
              {transaction.amount} руб.
            </span>
          </span>
          <span className="text-xs font-semibold">
            {transaction.type === TransactionTypeEnum.INCOME
              ? 'Доход'
              : 'Расход'}
          </span>
        </div>
        <p className="text-sm truncate text-ellipsis">
          {transaction.description}
        </p>
      </div>

      <div className="flex gap-2 flex-none">
        <EditTransactionButton transaction={transaction} />
        <RemoveTransactionButton transaction={transaction} />
      </div>
    </div>
  );
};
