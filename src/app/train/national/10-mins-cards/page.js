"use client";

import Cards from "@/components/Cards/Cards";
import { calculatePoints10Car } from "@/helpers/calculatePoints";

export default function LongCardsPage() {
  return (
    <Cards
      memoTime={10}
      recallTime={30}
      title={"10-Minutes Cards"}
      amount={13}
      numberBerRow={52}
      rowInPage={1}
      calculatePoints={calculatePoints10Car}
      standard={"National"}
      type={"cards"}
      defaultGrouping={"1"}
    />
  );
}
