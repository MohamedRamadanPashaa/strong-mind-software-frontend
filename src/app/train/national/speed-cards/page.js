"use client";

import Cards from "@/components/Cards/Cards";
import { calculatePointsSC } from "@/helpers/calculatePoints";

export default function SpeedCardsPage() {
  return (
    <Cards
      memoTime={5}
      recallTime={5}
      title={"Speed Cards"}
      amount={1}
      numberBerRow={52}
      rowInPage={1}
      calculatePoints={calculatePointsSC}
      standard={"National"}
      type={"speedCards"}
      defaultGrouping={"1"}
    />
  );
}
