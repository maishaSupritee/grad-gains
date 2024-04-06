import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Savings } from "@/db/schema";
import type { TransactionDetail } from "@/lib/types";
import savingsIcon from "@/public/images/savings-icon.svg";
import Image from "next/image";

interface SavingsCardProps {
  savingsData: Savings;
  transactionData: TransactionDetail;
}

export default function SavingsCard({ savingsData, transactionData }: SavingsCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={savingsIcon as string} alt="Icon" width={36} height={36}></Image>
              <CardTitle>Savings Type: {savingsData.type}</CardTitle>
            </div>
            <span>Amount: ${transactionData.totalAmount.toFixed(2)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p>Last Transaction: {transactionData.lastTransaction?.toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
