import Link from "next/link";
import { userAdapter } from "@/app/modules/users/adapters/userAdapter";
import { cookies } from "next/headers";
import UserProfile from "@/app/modules/users/components/UserProfile";

async function getData() {
  const cookieStore = cookies();
  const res = await userAdapter
    .get_me({ cookieStore: cookieStore })
    .then((res) => {
      return res;
    });

  return res;
}

export default async function Me() {
  const data = await getData();

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
      <UserProfile data={data}/>
    </main>
  );
}
