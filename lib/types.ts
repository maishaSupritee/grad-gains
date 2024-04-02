export type Provider = "discord" | "google";

export interface Savings {
  title: string;
  date: Date;
  amount: number;
}

export type TransactionType = "in" | "out";
