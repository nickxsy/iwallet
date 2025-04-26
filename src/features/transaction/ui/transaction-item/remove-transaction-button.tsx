import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/shared/lib';

import { TransactionPartial } from '@/entities/transaction';

import { useRemoveTransaction } from '../../model/hooks/use-remove-transaction';

export const RemoveTransactionButton = ({
  children,
  asChild = false,
  transaction,
  className
}: {
  children?: React.ReactNode;
  transaction: TransactionPartial;
  asChild?: boolean;
  className?: string;
}) => {
  const removeTransaction = useRemoveTransaction();

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      className={cn(className)}
      onClick={() => removeTransaction(transaction)}
    >
      {children}
    </Comp>
  );
};
