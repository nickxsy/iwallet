import {
  transactionModalStore,
  transactionStore
} from '@/entities/transaction';

export const getAllTransactions =
  transactionStore.selectors.selectTransactions ?? [];

export const getTransactionTotalBalance =
  transactionStore.selectors.selectTransactionBalance ?? 0;

export const getTransactionTotalIncome =
  transactionStore.selectors.selectTransactionTotalIncome ?? 0;

export const getTransactionTotalExpense =
  transactionStore.selectors.selectTransactionTotalExpense ?? 0;

export const getGroupedTransactions =
  transactionStore.selectors.getGroupedTransactions ?? [];

export const getIncomeGroupedTransactions =
  transactionStore.selectors.getIncomeGroupedTransactions ?? [];

export const getExpenseGroupedTransactions =
  transactionStore.selectors.getExpenseGroupedTransactions ?? [];

export const getTransactionModal =
  transactionModalStore.selectors.selectTransactionsModal;
