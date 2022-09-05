import Button from "components/atoms/Button";
import Heading from "components/atoms/Heading";

function Questions() {
  const handleClick = () => {
    const confirmation = confirm(
      "全てのデータが消えてしまいますが退会しますか？"
    );
    confirmation ? console.log("done") : console.log("Canceled");
  };
  return (
    <div className="flex justify-center mt-6">
      <div>
        <Heading text="よくある質問" />
        <h3 className="my-3">退会方法を教えてください。</h3>
        <p>退会処理は以下のボタンから行うことができます。</p>
        <p>
          退会処理を行うとこれまでのデータが全て消えてしまいますのでご注意ください。
        </p>
        <Button text="退会する" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Questions;
