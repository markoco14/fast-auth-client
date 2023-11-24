"use client";

import { useUserContext } from "@/app/UserContext";
import Link from "next/link";

export default function Navbar() {
  const { user } = useUserContext();

  return (
    <nav className="max-w-[600px] mx-auto flex h-full items-center">
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link href="/me">Me</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
