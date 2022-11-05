import Chart from "components/atoms/Chart";
import Heading from "components/atoms/Heading";
import LoadingIcon from "components/atoms/LoadingIcon";
import PayAmount from "components/atoms/PayAmount";
import TargetAmountForm from "components/organisms/TagertAmountForm";
import { useGetUsersUserId } from "api/users/users";
import { isPast, parseISO } from "date-fns";

type Props = {
  income?: [string, number][];
};

function MonthlyIncome({ income }: Props) {
  const { data } = useGetUsersUserId();
  const payOfPastWorks = income?.filter((dailyIncome) =>
    isPast(parseISO(dailyIncome[0]))
  );
  const totalIncome = income?.reduce((sum, array) => sum + array[1], 0) || 0;
  const earnedIncome =
    payOfPastWorks?.reduce((sum, array) => sum + array[1], 0) || 0;
  const expectedIncome = totalIncome - earnedIncome;

  return (
    <div className="md:rounded-xl md:border md:border-stone-300 md:bg-white md:px-6 md:pb-2">
      <div className="hidden md:block">
        <Heading text="今月の給料" />
      </div>
      {data && isFinite(totalIncome) ? (
        <div className="mt-4 text-sm">
          <ul>
            <li>
              <PayAmount text="本日まで" amount={earnedIncome} />
            </li>
            <li>
              <PayAmount text="見込み" amount={expectedIncome} />
            </li>
            <li>
              <PayAmount text="合計" amount={totalIncome} />
            </li>
          </ul>
          {data.target_amount && (
            <Chart
              target={data.target_amount}
              earnedIncome={earnedIncome}
              expectedIncome={expectedIncome}
            />
          )}
          <TargetAmountForm user={data} />
        </div>
      ) : (
        <div className="ml-5 mb-5">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default MonthlyIncome;
