import Link from "next/link";
import LoginSignup from "./components/auth/LoginSignup";


export default function Home() {
  return (
    <main>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
      <LoginSignup />
    </main>
  );
}
