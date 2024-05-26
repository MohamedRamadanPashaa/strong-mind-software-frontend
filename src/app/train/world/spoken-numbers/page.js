"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePointsSpoken } from "@/helpers/calculatePoints";
import { useEffect, useState } from "react";

export default function SpokenNumbersPage() {
  const [data, setData] = useState({
    memo: 110 / 60,
    recall: 5,
    amount: 100,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: (localStorage.getItem("spokenAmount") * 1 + 10) / 60 || 110 / 60,
        recall:
          localStorage.getItem(`spokenAttempt`) === "2"
            ? 15
            : localStorage.getItem(`spokenAttempt`) === "3"
            ? 25
            : 5,
        amount: localStorage.getItem("spokenAmount") * 1 || 100,
      }));
    }
  }, []);

  return (
    <Numbers
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      numberBerRow={30}
      title={"Spoken Numbers"}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePointsSpoken}
      standard={"World"}
      type={"spoken"}
      defaultGrouping={"22"}
    />
  );
}
