"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Investments } from "@/lib/types";
import moneyIcon from "@/public/images/money.png";
import upIcon from "@/public/images/up.png";
import downIcon from "@/public/images/down.png";
import Image from "next/image";

interface InvestmentCardProps {
  data: Investments;
}

export default function InvestmentsCard({ data }: InvestmentCardProps) {
  return (
    <div>
      <a href={data.url}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={moneyIcon} alt="Icon" width={36} height={36}></Image>
                <CardTitle>{data.title}: ${data.amount}</CardTitle>
              </div>
              <span className="flex">Invested:<div className="font-semibold flex">${data.original_investment}</div></span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {data.change_today >= 0 ? (
                <Image src={upIcon} alt="Icon" width={36} height={36} />
              ) : (
                <Image src={downIcon} alt="Icon" width={36} height={36} />
              )}
              <p className="justify-center align-middle flex-1 px-4 content-center">{data.change_today}% Today</p>
              {data.current_amount - data.original_investment >= 0 ? (
                <p className="justify-end text-green-500">${data.current_amount} Today</p>
              ) : (
                <p className="justify-end text-red-500">${data.current_amount} Today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
