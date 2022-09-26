import {
  usePatchCompaniesCompanyId,
  usePostCompanies,
} from "api/default/default";
import { Company } from "api/model";
import { useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { customMutationResult } from "api/custom-mutation-result";
import RadioButton from "components/atoms/RadioButton";
import SelectBox from "components/atoms/SelectBox";
import SubmitButton from "components/atoms/SubmitButton";

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
  const defaultWageSystem = company ? company.hourly_wage_system : true;
  const defaultWageAmount = company?.wage_amount ? company.wage_amount : 0;
  const defaultCurrencyType = company ? company.currency_type : "円";

  const [wageSystem, setWageSystem] = useState(defaultWageSystem);
  const [name, setName] = useState(defaultName);
  const [wageAmount, setWageAmount] = useState(defaultWageAmount);
  const [currencyType, setCurrencyType] = useState(defaultCurrencyType);
  const [updating, setUpdating] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const changeWageSystem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWageSystem(Boolean(e.target.value));
  };

  const formData = {
    name: name,
    hourly_wage_system: wageSystem,
    wage_amount: wageSystem ? wageAmount : null,
    currency_type: currencyType,
  };

  const queryClient = useQueryClient();
  const postCompany = usePostCompanies();
  const patchCompany = usePatchCompaniesCompanyId();
  const mutationResult = customMutationResult(
    queryClient,
    `/companies`,
    setCompanyForm
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [];
    if (name.length < 1 || name.length > 30)
      validation.push("名前は1～30文字にしてください。");
    if (wageSystem && (wageAmount > 99999 || wageAmount <= 0))
      validation.push("時給額が不正な値・または大きすぎます。");
    if (validation.length > 0) return alert(validation);

    setDisableButton(true);
    setUpdating(true);

    company?.id
      ? patchCompany.mutate(
          { companyId: company.id, data: formData },
          mutationResult
        )
      : postCompany.mutate({ data: formData }, mutationResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div>
          <RadioButton
            type="small"
            value="true"
            text="時給制"
            onChange={changeWageSystem}
            checked={wageSystem}
            position="l"
          />
          <RadioButton
            type="small"
            value=""
            text="日給制"
            onChange={changeWageSystem}
            checked={!wageSystem}
            position="r"
          />
        </div>
      </div>
      <div className="ml-4">
        <label htmlFor="name">名前: </label>
        <input
          id="name"
          className="bg-stone-100 p-1 mb-3 rounded-md"
          placeholder="例) 〇〇ワークス"
          defaultValue={defaultName}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        {name.length > 30 && (
          <p className="text-rose-600">名前は1～30文字にしてください。</p>
        )}
      </div>
      {wageSystem && (
        <div>
          <label htmlFor="wage">時給額: </label>
          <input
            id="wage"
            type="number"
            step="0.01"
            className="bg-stone-100 w-20 p-1 mb-3 rounded-md"
            defaultValue={defaultWageAmount ? defaultWageAmount : ""}
            onChange={(e) => setWageAmount(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
          {wageAmount != null && (wageAmount > 99999 || wageAmount < 0) && (
            <p className="text-rose-600">
              時給額が不正な値・または大きすぎます。
            </p>
          )}
        </div>
      )}
      <div className="ml-4">
        <label>通貨: </label>
        <SelectBox
          defaultValue={defaultCurrencyType}
          changeEvent={(e) => setCurrencyType(e.target.value)}
          array={currencyList}
        />
      </div>
      <div className="text-right mt-5">
        <SubmitButton updating={updating} disabled={disableButton} />
      </div>
    </form>
  );
}

export default CompanyForm;
