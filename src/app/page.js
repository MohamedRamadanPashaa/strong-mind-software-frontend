import Welcome from "@/components/Home/Welcome";
import CompetitionRegOpened from "@/components/Home/CompetitionRegOpened";

import Matches from "@/components/Home/Matches";
import { getServerSession } from "next-auth";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { options } from "./api/auth/[...nextauth]/options";

import classes from "./page.module.css";

const getRegOpenComp = async () => {
  "use server";
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/v1/competitions/registration-opened-competitions`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const { data } = await res.json();
      return data.competitions;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function HomePage() {
  const session = await getServerSession(options);
  const competitionsRegOpen = await getRegOpenComp();

  if (competitionsRegOpen?.length > 0 && session?.user) {
    competitionsRegOpen.filter(
      (comp) => !comp.participants.includes(session.user.id)
    );
  }

  return (
    <div className={classes.welcome}>
      <div className={classes.overlay}></div>

      <div className={classes.content}>
        <Welcome session={session} />

        {competitionsRegOpen?.length > 0 && (
          <CompetitionRegOpened competitionsRegOpen={competitionsRegOpen} />
        )}

        <Matches />
      </div>
    </div>
  );
}
