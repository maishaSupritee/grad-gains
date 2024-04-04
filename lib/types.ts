export type Provider = "discord" | "google";

export interface TransactionDetail {
  totalAmount: number;
  lastTransaction: Date | null;
}

export interface Investments {
  title: string;
  amount: number;
  change_today: number;
  current_amount: number;
  original_investment: number;
  url: string;
}

export type TransactionType = "in" | "out";
