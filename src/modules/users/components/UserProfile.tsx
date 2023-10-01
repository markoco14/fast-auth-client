export default function UserProfile({data}: {data: any;}) {

  return (
    <>
      <h1>User Profile</h1>
      <p>First Name: {data?.first_name}</p>
      <p>Last Name: {data?.last_name}</p>
      <p>Email: {data?.email}</p>
    </>
  );
}
