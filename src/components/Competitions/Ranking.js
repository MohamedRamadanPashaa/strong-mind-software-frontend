"use client";

import { useEffect, useState } from "react";
import useHttp from "../../hooks/http-hook";
import RankingTable from "./RankingTable";
import DisciplinePagination from "../PaginationDiscipline/DisciplinePagination";
import { NationalPagination } from "../../PaginationData/DisciplinePagination";

import classes from "./Ranking.module.css";

let disciplines = [];
const Ranking = ({ params }) => {
  const { sendRequest } = useHttp();
  const { slug, season } = params;
  const [title, setTitle] = useState("Overall");

  useEffect(() => {
    const getRanking = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/disciplines/high-result/${slug}/${season}`
        );

        disciplines = data.resultArray;
      } catch (error) {
        console.log(error);
      }
    };

    getRanking();
  }, [sendRequest, slug, season]);

  return (
    <div className={classes.ranking}>
      <DisciplinePagination
        setTitle={setTitle}
        title={title}
        paginationData={NationalPagination}
      />

      {disciplines.length > 0 && (
        <RankingTable
          title={title}
          disciplines={disciplines}
          competition={true}
        />
      )}
    </div>
  );
};

export default Ranking;
