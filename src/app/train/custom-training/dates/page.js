"use client";

import Dates from "@/components/Dates/Dates";
import { useEffect, useState } from "react";

export default function CustomNumbersPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 10,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("datesMemo") * 1 || 1,
        recall: localStorage.getItem("datesRecall") * 1 || 2,
        amount: localStorage.getItem("datesAmount") * 1 || 10,
      }));
    }
  }, []);

  return (
    <Dates
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Dates"}
      numberBerRow={1}
      rowInPage={10}
      standard={"Custom"}
      custom={true}
      type={"dates"}
      defaultGrouping={"1"}
    />
  );
}
