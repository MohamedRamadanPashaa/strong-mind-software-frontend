"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints15Num } from "@/helpers/calculatePoints";

export default function SpeedNumbersPage() {
  return (
    <Numbers
      memoTime={15}
      recallTime={30}
      title={"15-Minutes Numbers"}
      amount={1560}
      numberBerRow={40}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePoints15Num}
      standard={"National"}
      type={"numbers"}
      defaultGrouping={"22"}
    />
  );
}
