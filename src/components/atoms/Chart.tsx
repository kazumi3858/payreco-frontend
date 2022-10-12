type Props = {
  target: number;
  earnedIncome: number;
  expectedIncome: number;
};

function Chart({ target, earnedIncome, expectedIncome }: Props) {
  const calcRate = (income: number) => Math.floor((income / target) * 100);
  const achievementRate = calcRate(earnedIncome);
  const expectedAchievementRate = calcRate(expectedIncome) + achievementRate;
  const showRate = (rate: number) => (rate >= 100 ? 100 : rate);

  return (
    <div className="pt-2 pb-8">
      <p className="pb-3 font-bold">今月の目標達成率</p>
      <div className="relative h-6 w-full rounded-full bg-stone-200">
        <div
          className="absolute h-6 rounded-full bg-main-button-color"
          style={{ width: `${showRate(expectedAchievementRate)}%` }}
        ></div>
        <div
          className="absolute h-6 rounded-full bg-sub-button-color text-center"
          style={{ width: `${showRate(achievementRate)}%` }}
        ></div>
      </div>
      <p className="ml-2 mt-2 text-xs">
        <span className="text-sub-button-color">●</span>
        {`本日まで: ${showRate(achievementRate)}% `}
        <span className="text-main-gradient-l">●</span>
        {`見込み含め: ${showRate(expectedAchievementRate)}%`}
      </p>
    </div>
  );
}

export default Chart;
