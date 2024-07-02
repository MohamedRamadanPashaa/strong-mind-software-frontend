"use client";

import SelectDiscipline from "../SelectDiscipline/SelectDiscipline";
import RankingCompetitionTable from "./RankingCompetitionTable";
import { useState } from "react";

import classes from "./RankingLeaderBoard.module.css";

export default function RankingLeaderBoard({
  disciplines,
  selectData,
  session,
}) {
  const [title, setTitle] = useState("Overall");

  return (
    <div className={classes["ranking-table"]}>
      <SelectDiscipline
        setTitle={setTitle}
        title={title}
        selectData={selectData}
      />

      {disciplines.length > 0 && (
        <RankingCompetitionTable
          title={title}
          disciplines={disciplines}
          session={session}
        />
      )}
    </div>
  );
}
