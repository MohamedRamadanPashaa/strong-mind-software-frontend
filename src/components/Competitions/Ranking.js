"use client";

import { useState } from "react";
import DisciplinePagination from "../PaginationDiscipline/DisciplinePagination";
import { NationalPagination } from "../../PaginationData/DisciplinePagination";
import RankingCompetitionTable from "./RankingCompetitionTable";

import classes from "./Ranking.module.css";

const Ranking = ({ disciplines, session }) => {
  const [title, setTitle] = useState("Overall");

  return (
    <div className={classes.ranking}>
      <DisciplinePagination
        setTitle={setTitle}
        title={title}
        paginationData={NationalPagination}
      />

      {disciplines.length > 0 && (
        <RankingCompetitionTable
          title={title}
          disciplines={disciplines}
          competition={true}
          session={session}
        />
      )}
    </div>
  );
};

export default Ranking;
