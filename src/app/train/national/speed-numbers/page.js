"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints5Num } from "@/helpers/calculatePoints";

export default function LongNumbersPage() {
  return (
    <Numbers
      memoTime={5}
      recallTime={15}
      title={"Speed Numbers"}
      amount={760}
      numberBerRow={40}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePoints5Num}
      standard={"National"}
      type={"numbers"}
      defaultGrouping={"22"}
    />
  );
}
