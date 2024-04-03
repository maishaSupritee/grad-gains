"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Investments } from "@/lib/types";

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-1 stroke-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <CardTitle>
                  {data.title}: ${data.amount}
                </CardTitle>
              </div>
              <span className="flex">
                Invested:<div className="flex font-semibold">${data.original_investment}</div>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {data.change_today >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 stroke-2 stroke-green-500">
                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 stroke-2 stroke-red-500">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>

              )}
              <p className="flex-1 content-center justify-center px-4 align-middle">
                {data.change_today}% Today
              </p>
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
