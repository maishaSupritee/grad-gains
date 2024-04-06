import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import TransactionsCard from "@/components/ui/transactions-card";
import { db } from "@/db";
import { savings, transactions, type Transaction } from "@/db/schema";
import { GetIndividualSaving, GetTransactionsList } from "@/lib/savingsQueries";
import type { TransactionType } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SavingsDetailsPage({ params }: { params: { id: number } }) {
  const session = await auth();
  const user = session?.user;
  let transactionsList: Transaction[] = [];
  let savingsType = "";
  let totalSavings = 0;

  if (user?.id) {
    const saving = await GetIndividualSaving(params.id);
    if (saving) {
      savingsType = saving.type;
    }
    const transactions = await GetTransactionsList(params.id);
    transactionsList = transactions.transactionsList;
    totalSavings = transactions.totalAmount;
  }

  const addOrWithdraw = async (formData: FormData) => {
    "use server";
    const transactionType = formData.get("transactionType") as string;
    let amount = "";
    let type: TransactionType = "in";
    if (transactionType == "addFunds") {
      amount = formData.get("addFunds") as string;
    } else if (transactionType == "withdrawFunds") {
      type = "out";
      amount = "-" + (formData.get("withdrawFunds") as string);
    }
    if (user?.id) {
      await db.insert(transactions).values([
        {
          userId: user.id,
          savingsId: params.id,
          amount: amount,
          type: type,
          date: new Date(),
        },
      ]);

      revalidatePath(`/savings/${params.id}`);
    }
  };

  const deleteSavings = async () => {
    "use server";
    if (user?.id && totalSavings == 0) {
      await db.delete(savings).where(eq(savings.id, params.id));
      redirect("/savings");
    }
  };

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">
          Savings Type: <span className="semi-bold text-primary">{savingsType}</span>
        </h1>
        <form action={deleteSavings}>
          <Button type="submit" variant="destructive">
            Delete Savings
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-5 ">
        <form action={addOrWithdraw} className="flex flex-row gap-5">
          <input type="hidden" name="transactionType" value="addFunds" />
          <input
            type="number"
            step="0.01"
            name="addFunds"
            placeholder="0.00"
            required
            className="rounded p-2"
            inputMode="decimal"
            min="0"
          />
          <Button type="submit" value="add">
            Add Funds
          </Button>
        </form>

        <form action={addOrWithdraw} className="flex flex-row gap-5">
          <input type="hidden" name="transactionType" value="withdrawFunds" />
          <input
            type="number"
            step="0.01"
            name="withdrawFunds"
            placeholder="0.00"
            required
            className="rounded p-2"
            inputMode="decimal"
            min="0"
          />
          <Button variant="destructive" type="submit" value="withdraw">
            Withdraw Funds
          </Button>
        </form>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-1xl font-semibold">Transaction History</h1>
        <h1 className="text-2xl">
          Total Amount: <span className="semi-bold text-primary">{totalSavings.toFixed(2)}</span>
        </h1>
      </div>
      {transactionsList.map((transaction, index) => (
        <TransactionsCard key={index} transactionData={transaction} />
      ))}
    </div>
  );
}
