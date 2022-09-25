import Link from "next/link";

function Terms() {
  const headStyle = "text-xl mt-5 mb-2 font-bold";
  const listStyle = "my-2 list-disc pl-5";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="my-10 px-5">
        <h2 className="text-3xl text-center mb-4 font-bold">利用規約</h2>
        この利用規約（以下、「本規約」といいます。）は、このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
        <h3 className={headStyle}>第1条（適用）</h3>
        <p>
          本規約は、ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。
        </p>
        <p>
          本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
        </p>
        <p>
          本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </p>
        <h3 className={headStyle}>第2条（利用登録）</h3>
        <p>
          本サービスにおいては、登録希望者が本規約に同意の上、定められた方法によって利用登録をすることで完了するものとします。
        </p>
        <p>
          本サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
        </p>
        <ul className={listStyle}>
          <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
          <li>本規約に違反したことがある者からの申請である場合</li>
          <li>その他、利用登録を相当でないと判断した場合</li>
        </ul>
        <h3 className={headStyle}>第3条（ユーザー情報の管理）</h3>
        <p>
          ユーザーは、自己の責任において、本サービスのユーザー情報を適切に管理するものとします。
        </p>
        <p>
          本サービスは、ユーザーIDが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
        </p>
        <p>
          ユーザー情報が第三者によって使用されたことによって生じた損害は、本サービスは一切の責任を負わないものとします。
        </p>
        <h3 className={headStyle}>第4条（利用料金）</h3>
        <p>
          ユーザーは、本サービスを無料で利用することができます。本サービス内で利用料金を請求することはありません。
        </p>
        <h3 className={headStyle}>第5条（禁止事項）</h3>
        <p></p>
        ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        <ul className={listStyle}>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>
            本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
          </li>
          <li>
            他のユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </li>
          <li>本サービスによって得られた情報を商業的に利用する行為</li>
          <li>本サービスの運営を妨害するおそれのある行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正な目的を持って本サービスを利用する行為</li>
          <li>
            本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
          </li>
          <li>
            本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
          </li>
          <li>その他、本サービスが不適切と判断する行為</li>
        </ul>
        <h3 className={headStyle}>第6条（本サービスの提供の停止等）</h3>
        <p>
          本サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
        </p>
        <ul className={listStyle}>
          <li>本サービスにかかるシステムの保守点検または更新を行う場合</li>
          <li>
            地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
          </li>
          <li>コンピュータまたは通信回線等が事故により停止した場合</li>
          <li>その他、本サービスの提供が困難と判断した場合</li>
        </ul>
        <p>
          本サービスは提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
        </p>
        <h3 className={headStyle}>第7条（利用制限および登録抹消）</h3>
        <p>
          本サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
        </p>
        <ul className={listStyle}>
          <li>本li約のいずれかの条項に違反した場合</li>
          <li>登録事項に虚偽の事実があることが判明した場合</li>
          <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
          <li>その他、本サービスの利用を適当でないと判断した場合</li>
        </ul>
        <p>
          本サービスは、本条に基づき行った行為によりユーザーに生じた損害について、一切の責任を負いません。
        </p>
        <h3 className={headStyle}>第8条（退会）</h3>
        <p>
          ユーザーは、本サービスの定める退会手続により、本サービスから退会できるものとします。
        </p>
        <h3 className={headStyle}>第9条（保証の否認および免責事項）</h3>
        <p>
          本サービスは、事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
        </p>
        <p>
          本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
        </p>
        <p>
          本サービスは、ユーザーと他のユーザーまたは第三者との間において生じた紛争等について一切責任を負いません。
        </p>
        <h3 className={headStyle}>第10条（サービス内容の変更等）</h3>
        <p>
          本サービスはユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
        </p>
        <h3 className={headStyle}>第11条（利用規約の変更）</h3>
        <p>
          本サービスは以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
        </p>
        <ul className={listStyle}>
          <li>本規約の変更がユーザーの一般の利益に適合するとき</li>
          <li>
            本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき
          </li>
        </ul>
        <p>
          本サービスはユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
        </p>
        <h3 className={headStyle}>第12条（個人情報の取扱い）</h3>
        <p>
          本サービスの利用によって取得する個人情報については、「プライバシーポリシー」に従い適切に取り扱うものとします。
        </p>
        <h3 className={headStyle}>第13条（通知または連絡）</h3>
        <p>
          ユーザーと本サービスとの間の通知または連絡は、本サービスの定める方法によって行うものとします。現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、発信時にユーザーへ到達したものとみなします。
        </p>
        <h3 className={headStyle}>第14条（権利義務の譲渡の禁止）</h3>
        <p>
          ユーザーは、事前の承諾なく利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
        </p>
        <h3 className={headStyle}>第15条（準拠法・裁判管轄）</h3>
        <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
        <p>
          本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </p>
        <div className="mt-5 text-center">
          <Link href="/">
            <a>トップページに戻る</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Terms;
