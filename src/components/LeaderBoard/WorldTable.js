"use client";

import { useEffect, useState } from "react";
import { WorldPagination } from "../../PaginationData/DisciplinePagination";

import RankingTable from "../Competitions/RankingTable";
import useHttp from "../../hooks/http-hook";
import SelectDiscipline from "../SelectDiscipline/SelectDiscipline";

import classes from "./ReviewTable.module.css";

let disciplines = [];
const WorldTable = () => {
  const [title, setTitle] = useState("Overall");
  const { sendRequest } = useHttp();

  useEffect(() => {
    const getRanking = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/disciplines/leader-board?standard=World`
        );

        disciplines = data.resultArray;
      } catch (error) {
        console.log(error);
      }
    };

    getRanking();
  }, [sendRequest]);

  return (
    <div className={classes["review-table"]}>
      <SelectDiscipline
        setTitle={setTitle}
        title={title}
        selectData={WorldPagination}
      />

      {disciplines.length > 0 && (
        <RankingTable title={title} disciplines={disciplines} />
      )}
    </div>
  );
};

export default WorldTable;
