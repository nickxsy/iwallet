import { useAppSelector } from '@/shared/lib';

import { getGroupedTransactions } from '../../model/transaction.selectors';
import { TransactionItem } from '../transaction-item/transaction-item';

export const TransactionGrouped = ({ selector }: { selector?: any }) => {
  const content = useAppSelector(selector ?? getGroupedTransactions);

  console.log(content);
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(content).map(([date, transactions]) => (
        <div key={date}>
          <h3 className="font-bold mb-2">{date}</h3>
          <div className="flex flex-col gap-2">
            {transactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
