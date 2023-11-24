import Link from "next/link";
import { userAdapter } from "@/modules/users/adapters/userAdapter";
import { cookies } from "next/headers";
import Profile from "@/modules/users/components/Profile";
import Navbar from "@/components/Navbar";

async function getData() {
  try {
    const cookieStore = cookies();
    const res = await userAdapter.get_me({ cookieStore: cookieStore });
    return { data: res };
  } catch (error) {
    return { error: "No Access" };
  }
}

export default async function Me() {
  const { data, error } = await getData();

  if (error) {
    return (
      <>
      <header className="mb-16 h-[48px] shadow">
        <Navbar />
      </header>
      <main>
        <div className="max-w-[600px] mx-auto">
          <p>You need to log in to see this page.</p>
          <Link href="/">Log in</Link>
        </div>
      </main>
      </>
    );
  }

  return (
    <>
      <header className="mb-16 shadow">
        <nav className="max-w-[600px] mx-auto flex h-[48px] items-center">
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
        <div className="max-w-[600px] mx-auto">
          {data && <Profile data={data} />}
        </div>
      </main>
    </>
  );
}
