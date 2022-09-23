import Link from "next/link";

function Footer() {
  return (
    <div className="space-x-10 text-center bg-stone-200 py-2">
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
  );
}

export default Footer;
