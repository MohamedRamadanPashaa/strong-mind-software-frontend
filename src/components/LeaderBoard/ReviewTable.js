"use client";

import { useState } from "react";
import { ReviewTablePagination } from "../../PaginationData/ReviewTablePagination";
import MainTable from "./MainTable";
import SelectDiscipline from "../SelectDiscipline/SelectDiscipline";

import classes from "./ReviewTable.module.css";

const ReviewTable = () => {
  const [title, setTitle] = useState("Object One");

  return (
    <div className={classes["review-table"]}>
      <SelectDiscipline
        setTitle={setTitle}
        title={title}
        selectData={ReviewTablePagination}
      />

      <MainTable title={title} />
    </div>
  );
};

export default ReviewTable;
