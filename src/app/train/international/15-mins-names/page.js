"use client";

import Names from "@/components/Names/Names";
import { calculatePoints15Names } from "@/helpers/calculatePoints";

export default function LongNamesPage() {
  return (
    <Names
      memoTime={15}
      recallTime={30}
      title={"15-Minutes Names"}
      amount={134}
      numberBerRow={3}
      rowInPage={2}
      calculatePoints={calculatePoints15Names}
      standard={"International"}
      type={"names"}
      defaultGrouping={"1"}
    />
  );
}
