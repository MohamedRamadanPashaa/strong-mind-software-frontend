import { NationalPagination } from "@/PaginationData/DisciplinePagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import RankingLeaderBoard from "@/components/Competitions/RankingLeaderBoard";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getLeaderBoardsResults = async () => {
  "use server";

  const res = await fetch(
    `${checkEnvironment()}/api/v1/disciplines/leader-board?standard=National`,
    { cache: "no-store" }
  );

  const { data } = await res.json();

  if (res.status === 404) {
    return undefined;
  }

  return data.resultArray;
};

export default async function NationalPage() {
  const disciplines = await getLeaderBoardsResults();
  const session = await getServerSession(options);

  if (!disciplines) notFound();

  return (
    <RankingLeaderBoard
      title="Overall"
      selectData={NationalPagination}
      disciplines={disciplines}
      session={session}
    />
  );
}
