import ViewMatch from "@/components/ViewMatch/ViewMatch";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getMatch = async (disciplineId) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/disciplines/get-discipline/${disciplineId}`,
    {
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  if (res.status === 404) notFound();

  return data.discipline;
};
export default async function ViewMatchPage({ params }) {
  const { disciplineId } = params;

  const currentMatch = await getMatch(disciplineId);

  const matchRunning = currentMatch.createdAt === currentMatch.updatedAt;

  return (
    <ViewMatch
      disciplineId={disciplineId}
      currentMatch={currentMatch}
      matchRunning={matchRunning}
    />
  );
}
