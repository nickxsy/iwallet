import { AddTransactionExpenceButton } from '../ui/transaction-footer/add-transaction-expense-button';
import { AddTransactionIncomeButton } from '../ui/transaction-footer/add-transaction-income-button';

export function FooterTransaction() {
  return (
    <div className="sticky flex gap-2 p-2 bottom-0 left-0 w-full">
      <AddTransactionExpenceButton />
      <AddTransactionIncomeButton />
    </div>
  );
}
