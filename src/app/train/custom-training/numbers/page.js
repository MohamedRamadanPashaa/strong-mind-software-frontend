"use client";

import Numbers from "@/components/Numbers/Numbers";
import { useEffect, useState } from "react";

export default function CustomNumbersPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 80,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("numbersMemo") * 1 || 1,
        recall: localStorage.getItem("numbersRecall") * 1 || 2,
        amount: localStorage.getItem("numbersAmount") * 1 || 80,
      }));
    }
  }, []);

  return (
    <Numbers
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Numbers"}
      numberBerRow={40}
      factor={10}
      rowInPage={6}
      custom={true}
      standard={"Custom"}
      type={"numbers"}
      defaultGrouping={"22"}
    />
  );
}
