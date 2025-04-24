import { persistStorage } from '@/shared/lib';

import { Transaction, TransactionPartial } from './types';

const TRANSACTION_STORAGE_KEY = 'transaction_key';

class TransactionRepository {
  async getTransactions(): Promise<TransactionPartial[]> {
    return persistStorage.getItemSafe<Transaction[]>(
      TRANSACTION_STORAGE_KEY,
      []
    );
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    return persistStorage
      .getItemSafe<Transaction[]>(TRANSACTION_STORAGE_KEY, [])
      .then(transactions =>
        transactions.find(transaction => transaction.id === id)
      );
  }

  async saveTransaction(data: Transaction) {
    const transactions = await this.getTransactions();
    const transactionIndex = transactions.findIndex(
      transaction => transaction.id === data.id
    );

    if (transactionIndex === -1) {
      transactions.push(data);
    } else {
      transactions[transactionIndex] = data;
    }

    await persistStorage.setItemSafe(TRANSACTION_STORAGE_KEY, transactions);
  }

  async removeTransaction(id: string) {
    const transactions = await this.getTransactions();

    await persistStorage.setItemSafe(
      TRANSACTION_STORAGE_KEY,
      transactions.filter(transaction => transaction.id !== id)
    );
  }
}

export const transactionRepository = new TransactionRepository();
