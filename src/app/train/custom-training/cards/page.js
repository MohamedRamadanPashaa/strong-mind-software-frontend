"use client";

import Cards from "@/components/Cards/Cards";
import { useEffect, useState } from "react";

export default function CustomCardsPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 2,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("cardsMemo") * 1 || 1,
        recall: localStorage.getItem("cardsRecall") * 1 || 2,
        amount: Math.ceil((localStorage.getItem("cardsAmount") * 1) / 52) || 2,
      }));
    }
  }, []);

  return (
    <Cards
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Cards"}
      numberBerRow={52}
      rowInPage={1}
      standard={"Custom"}
      custom={true}
      type={"cards"}
      defaultGrouping={"1"}
    />
  );
}
