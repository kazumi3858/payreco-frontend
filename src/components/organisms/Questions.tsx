import { auth, provider } from "auth/firebase";
import { deleteUser, reauthenticateWithPopup } from "firebase/auth";
import Button from "components/atoms/Button";
import Heading from "components/atoms/Heading";
import router from "next/router";
import { useGetUsersUserId } from "api/users/users";
import { useDeleteAuthentication } from "api/default/default";

function Questions() {
  const { data } = useGetUsersUserId();
  const user = auth.currentUser;

  const reauthenticate = () => {
    user &&
      reauthenticateWithPopup(user, provider)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
  };

  const deleteServerSideData = useDeleteAuthentication();

  const deleteAccount = () =>
    user &&
    deleteUser(user)
      .then(() => {
        data && deleteServerSideData.mutate({ userId: data.id });
        console.log("An account has been deleted.");
        router.push("/");
        alert(
          "退会処理が完了しました。ご利用いただきましてありがとうございました。"
        );
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          reauthenticate();
          alert(
            "アカウント認証に失敗したため処理が実行できませんでした。再度お試しください。"
          );
        } else {
          console.log(error);
        }
      });

  const handleClick = () => {
    const confirmation = confirm(
      "全てのデータが消えてしまいますが退会しますか？"
    );
    confirmation ? deleteAccount() : console.log("Canceled.");
  };
  return (
    <div className="flex justify-center mt-6">
      <div>
        <Heading text="よくある質問" />
        <h3 className="my-3">退会方法を教えてください。</h3>
        <p>退会処理は以下のボタンから行うことができます。</p>
        <p>
          ※
          退会処理を行うとこれまでのデータが全て消えてしまいますのでご注意ください。
        </p>
        <p>
          ※ 退会処理を行う際にGooleアカウントの再認証が必要な場合がございます。
        </p>
        <div className="my-6 text-center">
          <Button text="退会する" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Questions;
