"use client";

import Words from "@/components/Words/Words";
import { useEffect, useState } from "react";

export default function CustomWordsPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 90,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("wordsMemo") * 1 || 1,
        recall: localStorage.getItem("wordsRecall") * 1 || 2,
        amount: localStorage.getItem("wordsAmount") * 1 || 20,
      }));
    }
  }, []);

  return (
    <Words
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Words"}
      numberBerRow={20}
      rowInPage={3}
      standard={"Custom"}
      custom={true}
      type={"words"}
      defaultGrouping={"1"}
    />
  );
}
