import Link from "next/link";
import LoginSignup from "@/modules/auth/components/LoginSignup";

export default function Home() {
  return (
    <>
      <header className="mb-16 h-[48px] shadow">
        <nav className="max-w-[600px] mx-auto flex h-full items-center">
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/me">Me</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <LoginSignup />
      </main>
    </>
  );
}
