import { auth } from "@/auth";
import SavingsCard from "@/components/ui/SavingsCard";
import { Button } from "@/components/ui/button";
import { type Savings } from "@/db/schema";
import { CalculateTotalSavings, GetSavingsData } from "@/lib/savingsQueries";
import { TransactionDetail } from "@/lib/types";

export default async function SavingsPage() {
  const session = await auth();
  const user = session?.user;
  let totalSavings: number = 0;
  let savingsDataWithTransactions: { savingsData: Savings; transactionData: TransactionDetail }[] =
    [];

  if (user && user.id) {
    savingsDataWithTransactions = await GetSavingsData(user.id);
    totalSavings = await CalculateTotalSavings(user.id);
  }

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <form className="flex flex-row items-center justify-between">
        <Button type="submit">Add New</Button>
        <div className="justify-end">Total Amount: ${totalSavings.toFixed(2)}</div>
      </form>
      {savingsDataWithTransactions.map((savingsDataWithTransaction, index) => (
        <SavingsCard
          key={index}
          savingsData={savingsDataWithTransaction.savingsData}
          transactionData={savingsDataWithTransaction.transactionData}
        />
      ))}
    </div>
  );
}
