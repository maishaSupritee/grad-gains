import { auth } from "@/auth";
import SavingsCard from "@/components/ui/SavingsCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { savings, type Savings } from "@/db/schema";
import { CalculateTotalSavings, GetSavingsData } from "@/lib/savingsQueries";
import { TransactionDetail } from "@/lib/types";
import { revalidatePath } from "next/cache";
import Link from "next/link";

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
  const addSavings = async (formData: FormData) => {
    "use server";
    const savingsType = formData.get("savingsType") as string;
    if (user && user.id && savingsType) {
      await db.insert(savings).values({
        userId: user.id,
        type: savingsType,
      });
      revalidatePath("/savings");
    }
  };

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <form action={addSavings} className="flex flex-row items-center gap-5 pt-3">
        <input
          type="text"
          name="savingsType"
          placeholder="What are you saving for?"
          required
          className="rounded px-2 py-2"
        />
        <Button type="submit">Add New</Button>
      </form>
      <div className="text-2xl font-semibold">
        Total Savings: <span className="text-primary">${totalSavings.toFixed(2)}</span>
      </div>
      {savingsDataWithTransactions.map((savingsDataWithTransaction, index) => (
        <Link href={`/savings/${savingsDataWithTransaction.savingsData.id}`} key={index}>
          <SavingsCard
            key={index}
            savingsData={savingsDataWithTransaction.savingsData}
            transactionData={savingsDataWithTransaction.transactionData}
          />
        </Link>
      ))}
    </div>
  );
}
