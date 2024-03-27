import { Button } from "@/components/ui/button";
import SavingsCard from "@/components/ui/SavingsCard";

export default function SavingsPage() {
  //sample data
  const savingsDataList = [
    {
      title: "Home",
      date: new Date(),
      amount: 100,
    },
    {
      title: "Wedding",
      date: new Date(),
      amount: 100,
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-8 pt-20">
      <div className="flex flex-row items-center justify-between">
        <Button>Add New</Button>
        <div className="justify-end">Total Amount: $200</div>
      </div>
      {savingsDataList.map((savingsData, index) => (
        <SavingsCard key={index} data={savingsData} />
      ))}
    </div>
  );
}
