import { auth } from "@/auth";
import SavingsCard from "@/components/ui/SavingsCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { savings, transactions, type Savings } from "@/db/schema";
import { TransactionDetail } from "@/lib/types";
import { eq } from "drizzle-orm";

export default async function SavingsPage() {
  const session = await auth();
  let savingsList: Savings[] = [];
  let totalSavings: number = 0;
  let savingsDataWithTransactions: { savingsData: Savings; transactionData: TransactionDetail }[] =
    [];

  if (session && session.user && session.user.id) {
    savingsList = await db.select().from(savings).where(eq(savings.userId, session.user.id));

    // Fetch transactions and calculate total amount for each savings
    savingsDataWithTransactions = await Promise.all(
      savingsList.map(async (savingsData) => {
        const transactionsList = await db
          .select()
          .from(transactions)
          .where(eq(transactions.savingsId, savingsData.id));

        const totalAmount = transactionsList.reduce(
          (sum, transaction) => sum + parseFloat(transaction.amount),
          0
        );

        // Create a TransactionDetail object for each savings
        const transactionData: TransactionDetail = {
          totalAmount: totalAmount,
          lastTransaction: null, // Assuming last transaction is null for now
        };

        return {
          savingsData: savingsData,
          transactionData: transactionData,
        };
      })
    );

    // Calculate the total amount across all savings
    totalSavings = savingsDataWithTransactions.reduce(
      (sum, { transactionData }) => sum + transactionData.totalAmount,
      0
    );
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
