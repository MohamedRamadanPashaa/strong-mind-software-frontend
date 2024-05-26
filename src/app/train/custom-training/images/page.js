"use client";

import Images from "@/components/Images/Images";
import { useEffect, useState } from "react";

export default function CustomImagesPage() {
  const [data, setData] = useState({
    memo: 1,
    recall: 2,
    amount: 50,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData((prev) => ({
        ...prev,
        memo: localStorage.getItem("imagesMemo") * 1 || 1,
        recall: localStorage.getItem("imagesRecall") * 1 || 2,
        amount: localStorage.getItem("imagesAmount") * 1 || 50,
      }));
    }
  }, []);

  return (
    <Images
      memoTime={data.memo}
      recallTime={data.recall}
      amount={data.amount}
      title={"Custom Images"}
      numberBerRow={5}
      rowInPage={3}
      standard={"Custom"}
      custom={true}
      type={"images"}
      defaultGrouping={"1"}
    />
  );
}
