import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Savings } from "@/lib/types";
import savingsIcon from "@/public/images/savings-icon.svg";
import Image from "next/image";

interface SavingsCardProps {
  data: Savings;
}

export default function SavingsCard({ data }: SavingsCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={savingsIcon} alt="Icon" width={36} height={36}></Image>
              <CardTitle>Savings Type: {data.title}</CardTitle>
            </div>
            <span>Amount: ${data.amount}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p>Last Transaction: {data.date.toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
