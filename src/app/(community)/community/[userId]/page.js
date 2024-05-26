import PersonalPage from "@/components/UserPersonalPage/PersonalPage";

export default function UserPage({ params }) {
  return <PersonalPage userId={params.userId} />;
}
