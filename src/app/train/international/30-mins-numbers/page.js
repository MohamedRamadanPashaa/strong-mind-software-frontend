"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints30Num } from "@/helpers/calculatePoints";

export default function SpeedNumbersPage() {
  return (
    <Numbers
      memoTime={30}
      recallTime={60}
      title={"30-Minutes Numbers"}
      amount={2360}
      numberBerRow={40}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePoints30Num}
      standard={"International"}
      type={"numbers"}
      defaultGrouping={"22"}
    />
  );
}
