import { useSortable } from '@dnd-kit/sortable';
import { Trash } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

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
      className="flex justify-between rounded-2xl bg-gray-100 p-4"
      key={transaction.id}
    >
      <div className="flex w-full gap-2">
        <div className="flex flex-none flex-col">
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
              {transaction.amount} ₽
            </span>
          </span>
          <span className="text-xs font-semibold">
            {transaction.type === TransactionTypeEnum.INCOME
              ? 'Доход'
              : 'Расход'}
          </span>
        </div>
        <p className="truncate text-sm text-ellipsis">
          {transaction.description}
        </p>
      </div>

      <div className="flex flex-none gap-2">
        <EditTransactionButton transaction={transaction} />
        <RemoveTransactionButton asChild transaction={transaction}>
          <Button className="size-10" variant="ghost">
            <Trash />
          </Button>
        </RemoveTransactionButton>
      </div>
    </div>
  );
};
