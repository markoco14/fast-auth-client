import Link from "next/link";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
			// TODO: get jwt in headers....
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Me() {
	const data = await getData();
	console.log('data', data)

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
			<p>First Name: {data.first_name}</p>
			<p>Last Name: {data.last_name}</p>
			<p>Email: {data.email}</p>
    </main>
  );
}
