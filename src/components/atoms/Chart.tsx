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
    <div className="py-6">
      <p className="pb-3">今月の目標達成率</p>
      <div className="relative w-full h-6 bg-stone-200 rounded-full">
        <div
          className="absolute h-6 bg-stone-400 rounded-full"
          style={{ width: `${showRate(expectedAchievementRate)}%` }}
        ></div>
        <div
          className="absolute h-6 text-center bg-stone-500 rounded-full"
          style={{ width: `${showRate(achievementRate)}%` }}
        >
          {showRate(achievementRate)}%
        </div>
      </div>
    </div>
  );
}

export default Chart;
