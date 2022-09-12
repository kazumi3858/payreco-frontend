import Heading from "components/atoms/Heading";

function Questions() {
  return (
    <div className="flex justify-center mt-6">
      <div>
        <Heading text="よくある質問" />
        <h3>為替レートは更新されているのでしょうか？</h3>
        <p>
          為替レートは1日1回最新情報を取得しております。本サービス開始以前の日付や未来の日付など、取得できない日のレートに対してはその日の最新レートを代わりに表示しております。
        </p>
        <p>
          月末に取得したレートをその月の最終レートとして確定し、その月の給料を計算します。
        </p>
      </div>
    </div>
  );
}

export default Questions;
