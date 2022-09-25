import Button from "components/atoms/Button";
import Heading from "components/atoms/Heading";
import { auth, provider } from "auth/firebase";
import { deleteUser, reauthenticateWithPopup } from "firebase/auth";
import { useGetUsersUserId } from "api/users/users";
import { useDeleteAuthentication } from "api/default/default";

function DeleteAccount() {
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
        alert("退会処理が完了しました。ご利用ありがとうございました。");
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
      <div className="max-w-2xl p-6">
        <Heading text="退会方法" />
        <p>退会処理は以下のボタンから行うことができます。</p>
        <p>
          ※
          退会処理を行うとこれまでのデータが全て消えてしまいますのでご注意ください。
        </p>
        <p>
          ※ 退会処理を行う際にGoogleアカウントの再認証が必要な場合がございます。
        </p>
        <div className="my-6 text-center">
          <button
            className="text-lg bg-stone-300 px-2 py-1 rounded-lg"
            onClick={handleClick}
          >
            退会する
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
