import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';

import { createBaseSelector, registerSlice } from '@/shared/lib';

import { TransactionTypeEnum } from '../const';
import { transactionRepository } from '../transaction.repository';
import {
  CreateTransactionData,
  TransactionPartial,
  UpdateTransactionData
} from '../types';

type GroupedTransactions = Record<string, TransactionPartial[]>;

export const groupTransactionsByDate = (
  transactions: TransactionPartial[]
): GroupedTransactions => {
  return transactions.reduce((acc, transaction) => {
    const date = transaction.date.split(',')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {} as GroupedTransactions);
};

export type TransactionStore = {
  transactions: TransactionPartial[];
};

const initialState: TransactionStore = {
  transactions: []
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.transactions.unshift(action.payload);
    });

    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.map(transaction => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
    });
  }
});

const loadTransaction = createAsyncThunk(
  'transaction/loadTransaction',
  async () => {
    const transaction = await transactionRepository.getTransactions();
    return transaction;
  }
);

const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async (data: UpdateTransactionData) => {
    const newTransaction = {
      ...data,
      date: new Date().toLocaleString(),
      id: data.id
    };
    await transactionRepository.saveTransaction(newTransaction);
    return newTransaction;
  }
);

const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (data: CreateTransactionData) => {
    const newTransaction = {
      ...data,
      date: new Date().toLocaleString(),
      id: nanoid()
    };
    await transactionRepository.saveTransaction(newTransaction);
    return newTransaction;
  }
);

const removeTransaction = createAsyncThunk(
  'transaction/removeTransaction',
  async (transactionId: string) => {
    await transactionRepository.removeTransaction(transactionId);
    return transactionId;
  }
);

const transactionsBaseSelector = createBaseSelector(transactionSlice);

const selectTransactions = createSelector(
  transactionsBaseSelector,
  s => s.transactions
);

const getIncomeGroupedTransactions = createSelector(
  selectTransactions,
  (transactions): Record<string, TransactionPartial[]> => {
    return transactions
      .filter(tx => tx.type === TransactionTypeEnum.INCOME)
      .reduce(
        (acc, tx) => {
          const dateKey = tx.date.split(',')[0];
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(tx);
          return acc;
        },
        {} as Record<string, TransactionPartial[]>
      );
  }
);

const getExpenseGroupedTransactions = createSelector(
  selectTransactions,
  (transactions): Record<string, TransactionPartial[]> => {
    return transactions
      .filter(tx => tx.type === TransactionTypeEnum.EXPENSE)
      .reduce(
        (acc, tx) => {
          const dateKey = tx.date.split(',')[0];
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(tx);
          return acc;
        },
        {} as Record<string, TransactionPartial[]>
      );
  }
);

const getGroupedTransactions = createSelector(
  selectTransactions,
  (transactions): Record<string, TransactionPartial[]> => {
    return transactions.reduce(
      (acc, tx) => {
        const dateKey = tx.date.split(',')[0];
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(tx);
        return acc;
      },
      {} as Record<string, TransactionPartial[]>
    );
  }
);

const selectTransactionTotalIncome = createSelector(
  selectTransactions,
  transactions =>
    transactions.reduce((acc, curr) => {
      const amount = Number(curr.amount);

      if (curr.type === TransactionTypeEnum.INCOME) return (acc += amount);

      return acc;
    }, 0)
);

const selectTransactionTotalExpense = createSelector(
  selectTransactions,
  transactions =>
    transactions.reduce((acc, curr) => {
      const amount = Number(curr.amount);

      if (curr.type === TransactionTypeEnum.EXPENSE) return (acc += amount);
      return acc;
    }, 0)
);

const selectTransactionBalance = createSelector(
  selectTransactionTotalIncome,
  selectTransactionTotalExpense,
  (income, expense) => income - expense
);

registerSlice([transactionSlice]);

export const transactionStore = {
  actions: {
    loadTransaction,
    removeTransaction,
    updateTransaction,
    createTransaction
  },
  selectors: {
    selectTransactions,
    selectTransactionTotalIncome,
    selectTransactionTotalExpense,
    selectTransactionBalance,
    getGroupedTransactions,
    getIncomeGroupedTransactions,
    getExpenseGroupedTransactions
  }
};
