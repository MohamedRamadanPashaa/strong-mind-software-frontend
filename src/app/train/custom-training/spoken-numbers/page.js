"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePointsSpoken } from "@/helpers/calculatePoints";
import { useEffect, useState } from "react";

export default function CustomNumbersPage() {
  const [data, setData] = useState({
    memo: 110 / 60,
    recall: 5,
    amount: 100,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("spokenCustomAmount") * 1 + 10 || 110 / 60,
        recall: localStorage.getItem(`spokenCustomRecall`) * 1 || 5,
        amount: localStorage.getItem("spokenCustomAmount") * 1 || 100,
      }));
    }
  }, []);

  return (
    <Numbers
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Spoken Numbers"}
      numberBerRow={30}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePointsSpoken}
      standard={"Custom"}
      custom={true}
      type={"spoken"}
      defaultGrouping={"22"}
    />
  );
}
