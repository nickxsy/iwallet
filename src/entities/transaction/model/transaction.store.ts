import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { transactionRepository } from "./transaction.repository";
import { CreateTransactionData, TransactionPartial } from "./types";
import { createBaseSelector, registerSlice } from "@/shared/lib";
import { TransactionTypeEnum } from "./const";

export type TransactionStore = {
  transactions: TransactionPartial[];
};

const initialState: TransactionStore = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.transactions.push(action.payload);
    });

    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    });
  },
});

const loadTransaction = createAsyncThunk(
  "transaction/loadTransaction",
  async () => {
    const transaction = await transactionRepository.getTransactions();
    return transaction;
  }
);

const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data: CreateTransactionData) => {
    const newTransaction = {
      ...data,
      date: new Date().toLocaleString(),
      id: nanoid(),
    };
    await transactionRepository.addTransaction(newTransaction);
    return newTransaction;
  }
);

const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (transactionId: string) => {
    await transactionRepository.removeTransaction(transactionId);
    return transactionId;
  }
);

const transactionsBaseSelector = createBaseSelector(transactionSlice);

const selectTransactions = createSelector(
  transactionsBaseSelector,
  (s) => s.transactions
);

const selectTransactionTotalIncome = createSelector(
  selectTransactions,
  (transactions) =>
    transactions.reduce((acc, curr) => {
      const amount = parseFloat(curr.amount);
      if (curr.type === TransactionTypeEnum.INCOME) return (acc += amount);
      return acc;
    }, 0)
);

const selectTransactionTotalExpense = createSelector(
  selectTransactions,
  (transactions) =>
    transactions.reduce((acc, curr) => {
      const amount = parseFloat(curr.amount);
      if (curr.type === TransactionTypeEnum.EXPENSE) return (acc += amount);
      return acc;
    }, 0)
);

const selectTransactionBalance = createSelector(
  selectTransactionTotalIncome,
  selectTransactionTotalExpense,
  (income, expense) => (income - expense).toFixed(2)
);

registerSlice([transactionSlice]);

export const transactionStore = {
  actions: {
    loadTransaction,
    removeTransaction,
    createTransaction,
  },
  selectors: {
    selectTransactions,
    selectTransactionTotalIncome,
    selectTransactionTotalExpense,
    selectTransactionBalance,
  },
};
