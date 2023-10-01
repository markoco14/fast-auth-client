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
      {error ? (
        <p>You need to log in to see this page.</p>
      ) : (
        // @ts-ignore
        <Profile data={data} />
      )}
    </main>
  );
}
