import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { transactionRepository } from "./transaction.repository";
import { Transaction, TransactionId } from "./types";
import { createBaseSelector, registerSlice } from "@/shared/lib";

export type TransactionStore = {
  currentTransaction?: Transaction;
};

const initialState: TransactionStore = {
  currentTransaction: undefined,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTransaction.fulfilled, (state, action) => {
      state.currentTransaction = action.payload;
    });

    builder.addCase(removeTransaction.fulfilled, (state) => {
      // state.currentTransaction();
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

const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id: TransactionId) => {
    await transactionRepository.removeTransaction(id);
    return;
  }
);

const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data: Transaction) => {
    const newTransaction = { ...data, id: nanoid() as TransactionId };
    await transactionRepository.addTransaction(newTransaction);
    return;
  }
);

const baseSelector = createBaseSelector(transactionSlice);

registerSlice([transactionSlice]);

export const transactionStore = {
  actions: {
    loadTransaction,
    removeTransaction,
    createTransaction,
  },
  selectors: {
    selectTransition: createSelector(baseSelector, (s) => s.currentTransaction),
  },
};
