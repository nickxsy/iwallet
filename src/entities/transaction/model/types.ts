import { TransactionTypeEnum } from './const';

export type TransactionType =
  (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  type: TransactionType;
  description?: string;
};

export type TransactionPartial = {
  id: string;
  amount: number;
  date: string;
  type: TransactionType;
  description?: string;
};

export type CreateTransactionData = {
  amount: number;
  date: string;
  type: TransactionType;
  description?: string;
};

export type UpdateTransactionData = {
  id: string;
  amount: number;
  date: string;
  type: TransactionType;
  description?: string;
};
