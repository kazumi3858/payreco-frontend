import RadioButton from "components/atoms/RadioButton";
import SelectBox from "components/atoms/SelectBox";
import SubmitButton from "components/atoms/SubmitButton";
import Label from "components/atoms/Label";
import { Company } from "api/model";
import { useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { customMutationResult } from "api/custom-mutation-result";
import {
  usePatchCompaniesCompanyId,
  usePostCompanies,
} from "api/default/default";

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

  const [isWageSystem, setIsWageSystem] = useState(defaultWageSystem);
  const [name, setName] = useState(defaultName);
  const [wageAmount, setWageAmount] = useState(defaultWageAmount);
  const [currencyType, setCurrencyType] = useState(defaultCurrencyType);
  const [updating, setUpdating] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const changeWageSystem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWageSystem(Boolean(e.target.value));
  };

  const formData = {
    name: name,
    hourly_wage_system: isWageSystem,
    wage_amount: isWageSystem ? wageAmount : null,
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
    if (isWageSystem && (wageAmount > 99999 || wageAmount <= 0))
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
      <div className="w-72 text-center font-bold">
        <p>{company ? `${company.name}の詳細` : "勤務先を追加する"}</p>
      </div>
      <div className="flex justify-center">
        <div className="mb-3">
          <RadioButton
            value="true"
            text="時給制"
            onChange={changeWageSystem}
            isChecked={isWageSystem}
            shape="rounded-l-full"
            padding="px-6 py-1"
          />
          <RadioButton
            value=""
            text="日給制"
            onChange={changeWageSystem}
            isChecked={!isWageSystem}
            shape="rounded-r-full"
            padding="px-6 py-1"
          />
        </div>
      </div>
      <div>
        <Label width="w-14" htmlFor="name" title="名前" />
        <input
          id="name"
          className="mb-5 w-48 rounded-md bg-stone-100 px-1"
          placeholder="例: 〇〇ワークス"
          defaultValue={defaultName}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        {name.length > 30 && (
          <p className="text-rose-600">名前は1～30文字にしてください。</p>
        )}
      </div>
      <div className={isWageSystem ? "" : "hidden"}>
        <Label width="w-14" htmlFor="wage" title="時給額" />
        <input
          id="wage"
          type="number"
          step="0.01"
          placeholder="数値を入力"
          className="mb-5 w-28 rounded-md bg-stone-100 px-1"
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
      <div>
        <Label width="w-14" title="通貨" />
        <SelectBox
          defaultValue={defaultCurrencyType}
          changeEvent={(e) => setCurrencyType(e.target.value)}
          array={currencyList}
        />
      </div>
      <div className="mt-5 text-right">
        <SubmitButton updating={updating} disabled={disableButton} />
      </div>
    </form>
  );
}

export default CompanyForm;
