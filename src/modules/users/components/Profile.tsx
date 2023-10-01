import { UserProfile } from "../entities/UserProfile";

export default function Profile({ data }: { data: UserProfile }) {
  return (
    <>
      <h1>User Profile</h1>
      <p>Id: {data?.id}</p>
      <p>First Name: {data?.first_name}</p>
      <p>Last Name: {data?.last_name}</p>
      <p>Email: {data?.email}</p>
    </>
  );
}
