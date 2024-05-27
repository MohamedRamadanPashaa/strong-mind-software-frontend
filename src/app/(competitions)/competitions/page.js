import Competitions from "@/components/Competitions/Competitions";
import CreateCompetitionBtn from "@/components/Competitions/CreateCompetitionBtn";

import { checkEnvironment } from "@/helpers/checkEnvironment";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import classes from "./page.module.css";

const getCompetitions = async () => {
  "use server";
  const res = await fetch(`${checkEnvironment()}/api/v1/competitions`, {
    cache: "no-store",
  });

  const { data } = await res.json();

  if (!res.ok) {
    throw new Error("Something went wrong, Please try again later!");
  }

  return data.competitions;
};

export default async function CompetitionPage() {
  const competitions = await getCompetitions();
  const session = await getServerSession(options);

  return (
    <div className={classes.competitions}>
      <CreateCompetitionBtn session={session} />

      {competitions.length === 0 && (
        <p className={classes["no-competitions"]}>
          No Competition Created Yet.
        </p>
      )}
      {competitions.length > 0 && (
        <Competitions session={session} competitions={competitions} />
      )}
    </div>
  );
}
