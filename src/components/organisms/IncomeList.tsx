function IncomeList() {
  return (
    <div className="pt-5">
      <div className="max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
        <div className="flex justify-center">
          <div>
            <input type="radio" name="income" id="monthly" value="monthly" />
            <label htmlFor="monthly">今月の給料</label>
            <input type="radio" name="income" id="annual" value="annual" />
            <label htmlFor="annual">年間の給料</label>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <p>今月の給料</p>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-14">
            <p>年間の給料</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
