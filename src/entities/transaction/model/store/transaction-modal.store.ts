import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { createBaseSelector, registerSlice } from '@/shared/lib';

import { TransactionPartial, TransactionType } from '../types';

export type TransactionStore = {
  transaction?: TransactionPartial;
  type?: TransactionType;
  isOpen: boolean;
};

const initialState: TransactionStore = {
  isOpen: false
};

const transactionModalSlice = createSlice({
  name: 'transactionModal',
  initialState,
  reducers: {
    open: (
      state,
      action: PayloadAction<{
        transaction?: TransactionPartial;
        type?: TransactionType;
      }>
    ) => {
      state.isOpen = true;
      state.transaction = action.payload.transaction;
      state.type = action.payload.type;
    },
    close: state => {
      state.isOpen = false;
      state.transaction = undefined;
      state.type = undefined;
    }
  }
});

const transactionModalSelector = createBaseSelector(transactionModalSlice);

const selectTransactionsModal = createSelector(transactionModalSelector, s => {
  return {
    transaction: s.transaction,
    type: s.type,
    isOpen: s.isOpen
  };
});

const openTransactionModal = transactionModalSlice.actions.open;
const closeTransactionModal = transactionModalSlice.actions.close;

registerSlice([transactionModalSlice]);

export const transactionModalStore = {
  actions: {
    openTransactionModal,
    closeTransactionModal
  },
  selectors: {
    selectTransactionsModal
  }
};
