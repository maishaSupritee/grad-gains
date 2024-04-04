import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Savings } from "@/db/schema";
import { CalculateTotalSavings, GetSavingsData } from "@/lib/savingsQueries";
import { TransactionDetail } from "@/lib/types";
import profileIcon from "@/public/images/profile-icon.svg";
import profitIcon from "@/public/images/profit-icon.svg";
import savingsIcon from "@/public/images/savings-icon.svg";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;
  let totalSavings: number = 0;
  let savingsDataWithTransactions: { savingsData: Savings; transactionData: TransactionDetail }[] =
    [];

  if (user && user.id) {
    savingsDataWithTransactions = await GetSavingsData(user.id);
    totalSavings = await CalculateTotalSavings(user.id);
  }

  function SavingsCard() {
    return (
      <div>
        <Card>
          <CardHeader className="items-center gap-3 text-2xl font-semibold">
            <div className="flex items-center">
              <span>Savings Till Date: </span>
              <span className="pl-2 text-primary">${totalSavings.toFixed(2)}</span>
            </div>
            <Image src={savingsIcon} alt="Icon" width={40} height={40}></Image>
          </CardHeader>
          <CardContent>
            {savingsDataWithTransactions.map((data, index) => (
              <Card key={index} className="mb-2">
                <CardHeader className="items-center">
                  {data.savingsData.type}: ${data.transactionData.totalAmount.toFixed(2)}
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  const investmentsList = [
    {
      title: "Apple",
      invested: 230,
      current: 200,
      rate: 1.12,
    },
    {
      title: "Yahoo",
      invested: 9.85,
      current: 10,
      rate: 0.03,
    },
  ];
  const investmentsCardData = {
    amount: 29.85,
    investments: investmentsList,
  };
  function InvestmentsCard() {
    return (
      <div>
        <Card>
          <CardHeader className="items-center gap-3 text-2xl font-semibold">
            <div className="flex items-center">
              <span>Profit Till Date: </span>
              <span className="pl-2 text-primary">${investmentsCardData.amount}</span>
            </div>
            <Image src={profitIcon} alt="Icon" width={40} height={40}></Image>
          </CardHeader>
          <CardContent>
            {investmentsList.map((investmentsData, index) => (
              <Card key={index} className="mb-2">
                <CardHeader className="items-center">
                  {investmentsData.title}: ${investmentsData.current}, Invested: $
                  {investmentsData.invested}, ({investmentsData.rate}) Today
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col gap-10 overflow-auto px-10">
      <div className="mt-20 flex flex-row items-center gap-5">
        {user && user.image && (
          <Image
            src={user.image}
            alt={profileIcon}
            className="flex overflow-clip rounded-full"
            width={100}
            height={100}
          />
        )}
        <div className="flex flex-col">
          <h1 className="flex-grow text-3xl font-semibold">{user && user.name}</h1>
          <h2>{user && user.email}</h2>
        </div>
        <div className="flex flex-col gap-1 pl-20">
          <h2 className="text-2xl font-semibold">Friends</h2>
          <div className="w-30 h-0.5 gap-1 bg-gray-400"></div>
          <h3 className="text-2xl text-primary">50</h3>
        </div>
      </div>
      <div className="flex w-full flex-row justify-evenly gap-5">
        <div className="flex w-1/2 flex-col">{InvestmentsCard()}</div>
        <div className="flex w-1/2 flex-col">{SavingsCard()}</div>
      </div>
    </div>
  );
}
