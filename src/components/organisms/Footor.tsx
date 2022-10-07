import Link from "next/link";

type Props = {
  loginPage: boolean;
};
function Footer({ loginPage }: Props) {
  return (
    <div className="bg-gradient-to-r from-main-gradient-l to-main-gradient-r py-4 text-center text-xs">
      <div className="my-1 space-x-4">
        <Link href="/terms">
          <a className="hover:opacity-50">利用規約</a>
        </Link>
        <Link href="/policy">
          <a className="hover:opacity-50">プライバシーポリシー</a>
        </Link>
        {!loginPage && (
          <Link href="/delete-account">
            <a className="hover:opacity-50">退会方法</a>
          </Link>
        )}
      </div>
      <small>
        <a
          href="https://github.com/kazumi3858/payreco-backend"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-50"
        >
          GitHub repository
        </a>{" "}
        ©2022 kazumi
      </small>
    </div>
  );
}

export default Footer;
