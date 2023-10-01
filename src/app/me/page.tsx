import Link from "next/link";
import { userAdapter } from "../modules/auth/adapters/userAdapter";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const res = await userAdapter.get_me({cookieStore: cookieStore})
  .then((res) => {
    return res
  })

  return res
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
      <h1>User Profile</h1>
			<p>First Name: {data?.first_name}</p>
			<p>Last Name: {data?.last_name}</p>
			<p>Email: {data?.email}</p>
    </main>
  );
}
