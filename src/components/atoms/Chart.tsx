type Props = {
  target: number;
  earnedIncome: number;
  expectedIncome: number;
};

function Chart({ target, earnedIncome, expectedIncome }: Props) {
  const calcRate = (income: number) => Math.floor((income / target) * 100);
  const achievementRate = calcRate(earnedIncome);
  const expectedAchievementRate = calcRate(expectedIncome) + achievementRate;
  const result = (rate: number) => (rate >= 100 ? 100 : rate);

  return (
    <div className="py-6">
      <p className="pb-3">今月の目標達成率</p>
      <div className="relative w-full h-6 bg-stone-200 rounded-full">
        <div
          className="absolute h-6 bg-main-gradient-l rounded-full"
          style={{ width: `${result(expectedAchievementRate)}%` }}
        ></div>
        <div
          className="absolute h-6 text-center bg-sub-button-color rounded-full"
          style={{ width: `${result(achievementRate)}%` }}
        ></div>
      </div>
      <p className="text-xs ml-2 mt-2">
        <span className="text-sub-button-color">●</span>
        {`本日まで: ${result(achievementRate)}% `}
        <span className="text-main-gradient-l">●</span>
        {`見込み含め: ${result(expectedAchievementRate)}%`}
      </p>
    </div>
  );
}

export default Chart;
