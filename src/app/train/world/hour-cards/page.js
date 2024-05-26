"use client";

import Cards from "@/components/Cards/Cards";
import { calculatePoints60Car } from "@/helpers/calculatePoints";

export default function LongNumbersPage() {
  return (
    <Cards
      memoTime={60}
      recallTime={120}
      title={"Hour Cards"}
      amount={43}
      numberBerRow={52}
      rowInPage={1}
      calculatePoints={calculatePoints60Car}
      standard={"World"}
      type={"cards"}
      defaultGrouping={"1"}
    />
  );
}
