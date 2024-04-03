export type Provider = "discord" | "google";

export interface TransactionDetail {
  totalAmount: number;
  lastTransaction: Date | null;
}

export type TransactionType = "in" | "out";
