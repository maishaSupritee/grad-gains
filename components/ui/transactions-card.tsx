import { Transaction } from "@/db/schema";
import { Card, CardContent } from "./card";

interface TransactionsCardProps {
  transactionData: Transaction;
}

export default function TransactionsCard({ transactionData }: TransactionsCardProps) {
  let amount = "";
  let textStyle: React.CSSProperties = {};

  if (transactionData.type == "in") {
    textStyle.color = "#16a34a";
    amount = transactionData.amount;
  } else {
    textStyle.color = "red";
    amount = "-" + transactionData.amount;
  }

  return (
    <div>
      <Card>
        <CardContent className="flex flex-row justify-between p-5">
          <h1>{transactionData.date ? transactionData.date.toLocaleDateString() : ""}</h1>
          <span style={textStyle}>{amount}</span>
        </CardContent>
      </Card>
    </div>
  );
}
