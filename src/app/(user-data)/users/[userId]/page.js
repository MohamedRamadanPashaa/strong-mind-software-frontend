import UserDetails from "@/components/Users/UserDetails";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getUser = async (userId) => {
  const res = await fetch(`${checkEnvironment()}/api/v1/users/${userId}`, {
    cache: "no-store",
  });

  const { data } = await res.json();

  if (res.status === 404) notFound();

  return data;
};

export default async function UserDetailsPage({ params }) {
  const { userId } = params;
  const { user } = await getUser(userId);

  return <UserDetails user={user} />;
}
