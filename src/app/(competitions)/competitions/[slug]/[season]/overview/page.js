import CompetitionPage from "@/components/Competitions/CompetitionPage";
import { checkEnvironment } from "@/helpers/checkEnvironment";

const getCompetition = async ({ slug, season }) => {
  "use server";

  try {
    const res = await fetch(
      `${checkEnvironment()}/api/v1/competitions/${slug}/${season}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    return data.competition;
  } catch (error) {
    console.log(error);
  }
};

export default async function OverviewPage({ params }) {
  const { slug, season } = params;

  const competition = await getCompetition({ slug, season });

  return <CompetitionPage competition={competition} />;
}
