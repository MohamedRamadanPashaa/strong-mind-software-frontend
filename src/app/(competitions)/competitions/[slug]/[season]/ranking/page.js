import { options } from "@/app/api/auth/[...nextauth]/options";
import Ranking from "@/components/Competitions/Ranking";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getCompetitionResult = async (slug, season) => {
  "use server";

  const res = await fetch(
    `${checkEnvironment()}/api/v1/disciplines/high-result/${slug}/${season}`,
    { cache: "no-store" }
  );

  const { data } = await res.json();

  if (res.status === 404) {
    return undefined;
  }

  return data.resultArray;
};

export default async function RankingPage({ params }) {
  const { slug, season } = params;
  const session = await getServerSession(options);
  const disciplines = await getCompetitionResult(slug, season);

  if (!disciplines) notFound();

  return <Ranking disciplines={disciplines} session={session} />;
}
