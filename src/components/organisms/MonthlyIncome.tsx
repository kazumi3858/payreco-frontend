import Chart from "components/atoms/Chart";
import Heading from "components/atoms/Heading";
import TargetAmountForm from "components/organisms/TagertAmountForm";
import { useGetUsersUserId } from "api/users/users";
import { isPast, parseISO } from "date-fns";

type Props = {
  income?: [string, number][];
  isLoading: boolean;
};

function MonthlyIncome({ income, isLoading }: Props) {
  const { data } = useGetUsersUserId();
  const totalIncome = income?.reduce((sum, array) => sum + array[1], 0) || 0;
  const payOfPastWorks = income?.filter((dailyIncome) =>
    isPast(parseISO(dailyIncome[0]))
  );

  const earnedIncome =
    payOfPastWorks?.reduce((sum, array) => sum + array[1], 0) || 0;
  const expectedIncome = totalIncome - earnedIncome;

  return (
    <div className="md:bg-white md:rounded-3xl md:pb-5 md:px-6">
      <Heading text="今月の給料" />
      {!isLoading && isFinite(totalIncome) ? (
        <div>
          <ul>
            <li className="mb-2">
              本日まで: {earnedIncome.toLocaleString()}円
            </li>
            <li className="mb-2">
              見込み: {expectedIncome.toLocaleString()}円
            </li>
            <li className="mb-2">合計: {totalIncome.toLocaleString()}円</li>
          </ul>
          {data?.target_amount && (
            <Chart
              target={data.target_amount}
              earnedIncome={earnedIncome}
              expectedIncome={expectedIncome}
            />
          )}
          {data && <TargetAmountForm user={data} />}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default MonthlyIncome;
