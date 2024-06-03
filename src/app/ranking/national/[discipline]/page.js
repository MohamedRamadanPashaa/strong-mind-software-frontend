import RankingTable from "@/components/Competitions/RankingTable";
import { convertText } from "@/helpers/getDisciplineTitle";

export default async function DisciplinePage({ params }) {
  const title = convertText(params.discipline);

  return <RankingTable title={title} standard="National" />;
}
