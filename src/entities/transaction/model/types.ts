export type TransactionType = "income" | "expense";

export type TransactionId = Brand<UniqId, "TransactionId">;

export type Transaction = {
  id: TransactionId;
  amount: number;
  category: string;
  date: Date;
  description: string;
  type: TransactionType;
};
