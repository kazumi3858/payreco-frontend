import SubmitButton from "components/atoms/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import { usePatchUsersUserId } from "api/default/default";
import { User } from "api/model";
import { useState } from "react";

type Props = {
  user: User;
};

function TargetAmountForm({ user }: Props) {
  const defaultTargetAmount = user.target_amount ? user.target_amount : 0;
  const [targetAmount, setTargetAmount] = useState(defaultTargetAmount);
  const [updating, setUpdating] = useState(false);

  const queryClient = useQueryClient();
  const mutation = usePatchUsersUserId();
  const mutationResult = customMutationResult(
    queryClient,
    `/user`,
    setUpdating
  );

  const alertMessage = "目標金額が不正な値・または大きすぎます。";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    if (targetAmount > 9999999 || targetAmount <= 0) {
      setUpdating(false);
      return alert(alertMessage);
    }

    mutation.mutate(
      { data: { target_amount: targetAmount !== 0 ? targetAmount : null } },
      mutationResult
    );
  };

  return (
    <div className="pb-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="target">
          毎月の目標金額:{" "}
          <input
            id="target"
            className="w-20 bg-stone-100"
            type="number"
            defaultValue={defaultTargetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
          />
          円
        </label>
        <div className="ml-3 inline">
          <SubmitButton updating={updating} />
        </div>
      </form>
      {!user.target_amount && (
        <p className="text-xs">
          ※目標金額を設定すると現時点での達成率が確認できるようになります。
        </p>
      )}

      {targetAmount != null && (targetAmount > 9999999 || targetAmount < 0) && (
        <p className="text-rose-600">{alertMessage}</p>
      )}
    </div>
  );
}

export default TargetAmountForm;
