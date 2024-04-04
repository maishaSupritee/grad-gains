import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import TransactionsCard from "@/components/ui/transactions-card";
import { Transaction } from "@/db/schema";
import { GetIndividualSaving, GetTransactionsList } from "@/lib/savingsQueries";

export default async function SavingsDetailsPage({ params }: { params: { id: number } }) {
  const session = await auth();
  const user = session?.user;
  let transactionsList: Transaction[] = [];
  let savingsType: string = "";
  let totalSavings: number = 0;

  if (user && user.id) {
    const saving = await GetIndividualSaving(params.id);
    if (saving) {
      savingsType = saving.type;
    }
    const transactions = await GetTransactionsList(params.id);
    transactionsList = transactions.transactionsList;
    totalSavings = transactions.totalAmount;
  }

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">
          Savings Type: <span className="semi-bold text-primary">{savingsType}</span>
        </h1>
        <h1 className="text-2xl">
          Amount: <span className="semi-bold text-primary">{totalSavings.toFixed(2)}</span>
        </h1>
      </div>
      <div className="flex flex-row justify-between">
        <Button>Add Funds</Button>
        <Button variant="destructive">Withdraw Funds</Button>
      </div>
      <h1 className="text-1xl font-semibold">Transaction History</h1>
      {transactionsList.map((transaction, index) => (
        <TransactionsCard key={index} transactionData={transaction} />
      ))}
    </div>
  );
}
