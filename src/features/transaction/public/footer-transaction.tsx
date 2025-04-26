import { cn } from '@/shared/lib';

import { AddTransactionExpenceButton } from '../ui/transaction-footer/add-transaction-expense-button';
import { AddTransactionIncomeButton } from '../ui/transaction-footer/add-transaction-income-button';

export function FooterTransaction({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 flex w-full gap-2 p-2',
        className
      )}
    >
      <AddTransactionExpenceButton />
      <AddTransactionIncomeButton />
    </div>
  );
}
