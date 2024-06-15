import CompetitionPage from "@/components/Competitions/CompetitionPage";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getCompetition = async ({ slug, season }) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/competitions/${slug}/${season}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (res.status === 404) {
    return undefined;
  }

  return data.data.competition;
};

export default async function OverviewPage({ params }) {
  const { slug, season } = params;

  const competition = await getCompetition({ slug, season });

  if (!competition) {
    notFound();
  }

  return <CompetitionPage competition={competition} />;
}
