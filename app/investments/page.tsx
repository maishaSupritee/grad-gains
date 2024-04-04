import { Button } from "@/components/ui/button";
import InvestmentsCard from "@/components/ui/InvestmentsCard";

export default function InvestmentsPage() {
  //sample data
  const InvestmentsDataList = [
    {
      title: "Apple",
      amount: 179.66,
      change_today: +1.12,
      original_investment: 200,
      url: "https://finance.yahoo.com/quote/AAPL/",
      current_amount: 230,
    },
    {
      title: "Google",
      amount: 99.67,
      change_today: -0.03,
      original_investment: 10,
      url: "https://finance.yahoo.com/quote/GOOGL/",
      current_amount: 9.85,
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <div className="flex flex-row items-center justify-between">
        <Button>Add New</Button>
        <div className="justify-end text-lg font-bold">Total Profit: $29.85</div>
      </div>
      {InvestmentsDataList.map((InvestmentsDataList, index) => (
        <InvestmentsCard key={index} data={InvestmentsDataList} />
      ))}
    </div>
  );
}
