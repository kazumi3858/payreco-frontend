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
  const [targetAmount, setTargetAmount] = useState<number>(defaultTargetAmount);
  const [updating, setUpdating] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const mutation = usePatchUsersUserId();
  const mutationResult = customMutationResult(
    queryClient,
    `/user`,
    setUpdating
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    if (targetAmount > 9999999 || targetAmount <= 0) {
      setUpdating(false);
      return alert("目標金額が不正な値・または大きすぎます。");
    }

    mutation.mutate(
      { data: { target_amount: targetAmount !== 0 ? targetAmount : null } },
      mutationResult
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          毎月の目標金額:{" "}
          <input
            className="w-20 bg-stone-100"
            type="number"
            defaultValue={defaultTargetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
          />
          円
        </label>
        <SubmitButton updating={updating} />
      </form>
      {!user.target_amount && (
        <p className="text-xs">
          ※目標金額を設定すると現時点での達成率が確認できるようになります。
        </p>
      )}

      {targetAmount != null && (targetAmount > 9999999 || targetAmount < 0) && (
        <p className="text-rose-600">
          目標金額が不正な値・または大きすぎます。
        </p>
      )}
    </div>
  );
}

export default TargetAmountForm;
