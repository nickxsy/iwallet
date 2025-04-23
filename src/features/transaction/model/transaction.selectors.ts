import { transactionStore } from '@/entities/transaction';

export const getAllTransactions =
  transactionStore.selectors.selectTransactions ?? [];

export const getTransactionTotalBalance =
  transactionStore.selectors.selectTransactionBalance ?? 0;

export const getTransactionTotalIncome =
  transactionStore.selectors.selectTransactionTotalIncome ?? 0;

export const getTransactionTotalExpense =
  transactionStore.selectors.selectTransactionTotalExpense ?? 0;
