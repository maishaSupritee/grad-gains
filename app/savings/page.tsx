import { NavBar } from "@/components/NavBar";
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
    <div className="flex flex-col gap-5">
      <NavBar />
      <div className="flex flex-row items-center justify-between px-5">
        <Button>Add New</Button>
        <div className="justify-end">Total Amount: $200</div>
      </div>
      {savingsDataList.map((savingsData, index) => (
        <SavingsCard key={index} data={savingsData} />
      ))}
    </div>
  );
}
