import RadioButton from "components/atoms/RadioButton";
import { useState } from "react";

function IncomeList() {
  const [incomeData, setIncomeData] = useState<string>("monthly");
  console.log(incomeData);
  return (
    <div className="pt-5">
      <div className="max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
        <div className="flex justify-center">
          <div>
            <RadioButton
              value="monthly"
              text="今月の給料"
              onChange={() => setIncomeData("monthly")}
              checked={incomeData === "monthly"}
            />
            <RadioButton
              value="annual"
              text="年間の給料"
              onChange={() => setIncomeData("annual")}
              checked={incomeData === "annual"}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <p>今月の給料</p>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-14">
            <p>年間の給料</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
