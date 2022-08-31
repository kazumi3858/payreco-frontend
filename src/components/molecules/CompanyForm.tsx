import { Company } from "api/model";
import { SetStateAction, useState } from "react";

type Props = {
  setCompanyForm: React.Dispatch<SetStateAction<boolean>>;
  company?: Company;
};

const currencyList = [
  "円",
  "米ドル",
  "ユーロ",
  "英ポンド",
  "インドルピー",
  "豪ドル",
  "カナダドル",
  "ランド",
  "NZドル",
  "SGドル",
  "人民元",
  "スイスフラン",
];

function CompanyForm({ setCompanyForm, company }: Props) {
  const defaultName = company ? company.name : "";
  const defaultWageAmount = company?.wage_amount ? company.wage_amount : 0;
  const defaultCurrency = company ? company.currency_type : "円";
  const [wageSystem, setWageSystem] = useState<boolean>(
    company ? company.hourly_wage_system : true
  );
  const [name, setName] = useState<string>(defaultName);
  const [wageAmount, setWageAmount] = useState<number>(defaultWageAmount);
  const [currencyType, setCurrencyType] = useState<string>(defaultCurrency);
  const changeWageSystem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWageSystem(Boolean(e.target.value));
  };
  const formData = {
    name: name,
    hourly_wage_sytem: wageSystem,
    wage_amount: wageSystem ? wageAmount : null,
    currency_type: currencyType,
    use_id: "166d5e6b-0f61-4b91-bafa-ee2085f264b6",
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setCompanyForm(false);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>名前: </label>
              <input
                defaultValue={defaultName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                className="cursor-pointer"
                type="radio"
                value="true"
                onChange={changeWageSystem}
                checked={wageSystem === true}
              />
              <label>時給制</label>
              <input
                className="cursor-pointer"
                type="radio"
                onChange={changeWageSystem}
                checked={wageSystem === false}
                defaultValue=""
              />
              <label>日給制</label>
            </div>
            {wageSystem && (
              <div>
                <label>時給額: </label>
                <input
                  type="number"
                  defaultValue={defaultWageAmount}
                  onChange={(e) => setWageAmount(Number(e.target.value))}
                />
                <p className="text-rose-600">
                  {(wageAmount > 99999 || wageAmount < 0) &&
                    `金額がマイナス・または大きすぎます。`}
                </p>
              </div>
            )}
            <label>通貨: </label>
            <select
              defaultValue={defaultCurrency}
              onChange={(e) => setCurrencyType(e.target.value)}
            >
              {currencyList.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>

            <input className="block m-1 cursor-pointer" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm;
