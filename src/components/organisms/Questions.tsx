import Heading from "components/atoms/Heading";
import Link from "next/link";

function Questions() {
  return (
    <div className="mt-6 flex justify-center">
      <div className="max-w-2xl p-6 text-base">
        <Heading text="ヘルプ" />
        <div className="text-sm">
          <section className="mb-8">
            <h3 className="mb-2 font-bold">使い方を教えてください。</h3>
            <p>
              最初に「勤務先を追加する」をクリックして勤務先情報を登録してください。
            </p>
            <p>
              「勤務先を選んで〇月〇日の予定を追加」の欄から勤務先の名前をクリックするとスケジュールを登録できるようになります。
            </p>
          </section>
          <section className="mb-8">
            <h3 className="mt-3 mb-2 font-bold">
              為替レートは更新されているのでしょうか？
            </h3>
            <p>
              為替レートは月別に保存されており、1日1回最新情報を取得し更新しています。本サービス開始以前の月や未来の月など、取得できない月に対しては現時点での最新レートを使用しております。
            </p>
          </section>
          <section>
            <h3 className="mt-3 mb-2 font-bold">退会方法を教えてください。</h3>
            <p>
              退会処理は
              <Link href="/delete-account">
                <a className="text-stone-400 hover:text-stone-600">こちら</a>
              </Link>
              のページから行うことができます。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Questions;
