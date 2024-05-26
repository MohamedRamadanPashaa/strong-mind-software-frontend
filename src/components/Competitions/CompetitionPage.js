"use client";

import { useState } from "react";
import CompetitionInfo from "./CompetitionInfo";
import Participants from "./Participants";

import classes from "./CompetitionPage.module.css";

const CompetitionPage = ({ competition: comp }) => {
  const [competition, setCompetition] = useState(comp);

  return (
    <div className={classes["competition-page"]}>
      <CompetitionInfo
        competition={competition}
        setCompetition={setCompetition}
      />

      <Participants participants={competition.participants} />
    </div>
  );
};

export default CompetitionPage;
