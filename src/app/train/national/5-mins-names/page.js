"use client";

import Names from "@/components/Names/Names";
import { calculatePoints5Names } from "@/helpers/calculatePoints";

export default function LongNumbersPage() {
  return (
    <Names
      memoTime={5}
      recallTime={15}
      title={"5-Minutes Names"}
      amount={63}
      numberBerRow={3}
      rowInPage={2}
      calculatePoints={calculatePoints5Names}
      standard={"National"}
      type={"names"}
      defaultGrouping={"1"}
    />
  );
}
