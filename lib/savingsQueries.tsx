import { db } from "@/db";
import { Savings, savings, Transaction, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TransactionDetail } from "./types";

export async function GetSavingsData(
  userId: string
): Promise<{ savingsData: Savings; transactionData: TransactionDetail }[]> {
  const savingsList = await db.select().from(savings).where(eq(savings.userId, userId));

  const savingsDataWithTransactions = await Promise.all(
    savingsList.map(async (savingsData) => {
      const transactionsList = await db
        .select()
        .from(transactions)
        .where(eq(transactions.savingsId, savingsData.id));

      const totalAmount = transactionsList.reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount),
        0
      );

      // Get the date of the very last transaction if transactionsList is not empty
      const lastTransaction =
        transactionsList.length > 0
          ? transactionsList[transactionsList.length - 1]?.date || null
          : null;

      // Create a TransactionDetail object for each savings
      const transactionData: TransactionDetail = {
        totalAmount: totalAmount,
        lastTransaction: lastTransaction,
      };

      return {
        savingsData: savingsData,
        transactionData: transactionData,
      };
    })
  );

  return savingsDataWithTransactions;
}

export async function CalculateTotalSavings(userId: string): Promise<number> {
  let savingsDataWithTransactions: { savingsData: Savings; transactionData: TransactionDetail }[] =
    [];

  savingsDataWithTransactions = await GetSavingsData(userId);
  return savingsDataWithTransactions.reduce(
    (sum, { transactionData }) => sum + transactionData.totalAmount,
    0
  );
}

export async function GetTransactionsList(
  savingsId: number
): Promise<{ transactionsList: Transaction[]; totalAmount: number }> {
  const transactionsList = await db
    .select()
    .from(transactions)
    .where(eq(transactions.savingsId, savingsId));

  const totalAmount = transactionsList.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  return { transactionsList, totalAmount };
}

export async function GetIndividualSaving(savingsId: number): Promise<Savings | null> {
  const individualSavingList = await db.select().from(savings).where(eq(savings.id, savingsId));

  if (individualSavingList.length > 0 && individualSavingList[0]) {
    return individualSavingList[0];
  } else {
    return null;
  }
}
