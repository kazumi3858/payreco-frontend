import Link from "next/link";

type Props = {
  loginPage: boolean;
};
function Footer({ loginPage }: Props) {
  return (
    <div className="bg-gradient-to-r from-main-gradient-l to-main-gradient-r py-2 text-center text-xs">
      <div className="mt-1 space-x-4">
        <Link href="/terms">
          <a>利用規約</a>
        </Link>
        <Link href="/policy">
          <a>プライバシーポリシー</a>
        </Link>
        {!loginPage && (
          <Link href="/delete-account">
            <a>退会方法</a>
          </Link>
        )}
      </div>
      <small>
        <a
          href="https://github.com/kazumi3858/payreco-backend"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repository
        </a>{" "}
        ©2022 kazumi
      </small>
    </div>
  );
}

export default Footer;
