import CreateCompetition from "@/components/Competitions/CreateCompetition";

export default function UpdateCompetitionPage({ params }) {
  return <CreateCompetition slug={params.slug} season={params.season} />;
}
