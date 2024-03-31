export type Provider = "discord" | "google";

export interface Savings {
  title: string;
  date: Date;
  amount: number;
}

export interface Investments {
  title: string;
  amount: number;
  change_today: number;
  current_amount: number;
  original_investment: number;
  url: string;
}
