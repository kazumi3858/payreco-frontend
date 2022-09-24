import Link from "next/link";

function Footer() {
  return (
    <div className="text-sm space-x-4 text-center bg-stone-300 md:mt-5 py-2">
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
