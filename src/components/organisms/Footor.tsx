import Link from "next/link";

function Footer() {
  return (
    <div className="text-sm text-center bg-sub-button-color md:mt-5 py-2">
      <div className="space-x-4 mt-1">
        <Link href="/terms">
          <a>利用規約</a>
        </Link>
        <Link href="/policy">
          <a>プライバシーポリシー</a>
        </Link>
        <Link href="/delete-account">
          <a>退会方法</a>
        </Link>
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
