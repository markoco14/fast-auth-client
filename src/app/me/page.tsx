import Link from "next/link";
import { userAdapter } from "@/modules/users/adapters/userAdapter";
import { cookies } from "next/headers";
import Profile from "@/modules/users/components/Profile";

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
        {error ? (
          <div className="max-w-[600px] mx-auto">
            <p>You need to log in to see this page.</p>
            <Link href="/">Log in</Link>
          </div>
        ) : (
          // @ts-ignore
          <div className="max-w-[600px] mx-auto">
            <Profile data={data} />
          </div>
        )}
      </main>
    </>
  );
}
