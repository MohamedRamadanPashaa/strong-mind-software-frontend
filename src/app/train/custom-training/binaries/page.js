"use client";

import Numbers from "@/components/Numbers/Numbers";
import { useEffect, useState } from "react";

export default function CustomNumbersPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 90,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("binaryMemo") * 1 || 1,
        recall: localStorage.getItem("binaryRecall") * 1 || 2,
        amount: localStorage.getItem("binaryAmount") * 1 || 90,
      }));
    }
  }, []);

  return (
    <Numbers
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Binaries"}
      numberBerRow={30}
      factor={2}
      rowInPage={6}
      custom={true}
      standard={"Custom"}
      type={"binary"}
      defaultGrouping={"33"}
    />
  );
}
