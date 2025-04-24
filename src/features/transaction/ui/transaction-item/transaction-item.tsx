import { useSortable } from '@dnd-kit/sortable';

import { cn } from '@/shared/lib';

import {
  type TransactionPartial,
  TransactionTypeEnum
} from '@/entities/transaction';

import { EditTransactionButton } from './edit-transaction-button';
import { RemoveTransactionButton } from './remove-transaction-button';

export const TransactionItem = ({
  transaction,
  ...props
}: {
  transaction: TransactionPartial;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
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
