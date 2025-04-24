import { AddTransactionExpenceButton } from './add-transaction-expense-button';
import { AddTransactionIncomeButton } from './add-transaction-income-button';
import { ModalTransaction } from './modal-transaction';

export function FooterTransaction() {
  return (
    <div className="sticky flex gap-2 p-2 bottom-0 left-0 w-full">
      <ModalTransaction
        type="EXPENSE"
        trigger={() => <AddTransactionExpenceButton />}
      />
      <ModalTransaction
        type="INCOME"
        trigger={() => <AddTransactionIncomeButton />}
      />
    </div>
  );
}
