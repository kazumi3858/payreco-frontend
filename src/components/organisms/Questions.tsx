import Heading from "components/atoms/Heading";
import Link from "next/link";

function Questions() {
  return (
    <div className="flex justify-center mt-6">
      <div className="max-w-2xl p-6">
        <Heading text="ヘルプ" />
        <h3 className="font-bold">使い方を教えてください。</h3>
        <p>勤務スケジュールを登録・管理するためには、最初に勤務先情報を追加する必要があります。</p><p>勤務先を登録したらトップページの「勤務先を選んで予定を追加」から勤務先をクリックしてスケジュールを登録できるようになります。</p>
        <h3 className="font-bold mt-3">為替レートは更新されているのでしょうか？</h3>
        <p>
          為替レートは1日1回最新情報を取得しております。本サービス開始以前の日付や未来の日付など、取得できない日のレートに対してはその日の最新レートを代わりに表示しております。
        </p>
        <p>
          月末に取得したレートをその月の最終レートとして確定し、その月の給料を計算します。
        </p>
        <h3 className="font-bold mt-3">退会方法を教えてください。</h3>
        <p>退会処理は<Link href="/delete-account"><a className="text-sub-gradient-r">こちら</a></Link>のページから行うことができます。</p>
      </div>
    </div>
  );
}

export default Questions;
