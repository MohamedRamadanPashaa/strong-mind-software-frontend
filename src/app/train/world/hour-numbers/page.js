"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints60Num } from "@/helpers/calculatePoints";

export default function SpeedNumbersPage() {
  return (
    <Numbers
      memoTime={60}
      recallTime={120}
      title={"Hour Numbers"}
      amount={3920}
      numberBerRow={40}
      factor={10}
      rowInPage={6}
      calculatePoints={calculatePoints60Num}
      standard={"World"}
      type={"numbers"}
      defaultGrouping={"22"}
    />
  );
}
