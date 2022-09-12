import Link from "next/link";

function Footer() {
  return (
    <div className="space-x-10 text-center">
      <Link href="/">
        <a>利用規約</a>
      </Link>
      <Link href="/">
        <a>プライバシーポリシー</a>
      </Link>
      <Link href="/delete-account">
        <a>退会方法</a>
      </Link>
    </div>
  );
}

export default Footer;
