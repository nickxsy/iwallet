import {
  transactionModalStore,
  transactionStore
} from '@/entities/transaction';

export const getAllTransactions =
  transactionStore.selectors.selectTransactions ?? [];

export const getTransactionTotalBalance =
  transactionStore.selectors.selectTransactionBalance;

export const getTransactionTotalIncome =
  transactionStore.selectors.selectTransactionTotalIncome;

export const getTransactionTotalExpense =
  transactionStore.selectors.selectTransactionTotalExpense;

export const getGroupedTransactions =
  transactionStore.selectors.getGroupedTransactions ?? [];

export const getIncomeGroupedTransactions =
  transactionStore.selectors.getIncomeGroupedTransactions ?? [];

export const getExpenseGroupedTransactions =
  transactionStore.selectors.getExpenseGroupedTransactions ?? [];

export const getTransactionModal =
  transactionModalStore.selectors.selectTransactionsModal;
