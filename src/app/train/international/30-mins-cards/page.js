"use client";

import Cards from "@/components/Cards/Cards";
import { calculatePoints30Car } from "@/helpers/calculatePoints";

export default function LongNumbersPage() {
  return (
    <Cards
      memoTime={30}
      recallTime={60}
      title={"30-Minutes Cards"}
      amount={28}
      numberBerRow={52}
      rowInPage={1}
      calculatePoints={calculatePoints30Car}
      standard={"International"}
      type={"cards"}
      defaultGrouping={"1"}
    />
  );
}
