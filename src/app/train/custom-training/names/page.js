"use client";

import Names from "@/components/Names/Names";
import { useEffect, useState } from "react";

export default function CustomNamesPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 20,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("namesMemo") * 1 || 1,
        recall: localStorage.getItem("namesRecall") * 1 || 2,
        amount: localStorage.getItem("namesAmount") * 1 || 20,
      }));
    }
  }, []);

  return (
    <Names
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Names"}
      numberBerRow={3}
      rowInPage={2}
      standard={"Custom"}
      custom={true}
      type={"names"}
      defaultGrouping={"1"}
    />
  );
}
