import { Edit2 } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

import {
  type TransactionPartial,
  TransactionTypeEnum
} from '@/entities/transaction';

import { ModalTransaction } from './modal-transaction';
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
      <div className="flex gap-2">
        <div className="flex flex-col">
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
        <span className="text-sm truncate w-[150px] text-ellipsis">
          {transaction.description}
        </span>
      </div>

      <div className="flex gap-2">
        <ModalTransaction
          transaction={transaction}
          type={transaction.type}
          trigger={() => (
            <Button type="button" className="size-10" variant="ghost">
              <Edit2 />
            </Button>
          )}
        />
        <RemoveTransactionButton transaction={transaction} />
      </div>
    </div>
  );
};
