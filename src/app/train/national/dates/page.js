"use client";

import Dates from "@/components/Dates/Dates";
import { calculatePointsDates } from "@/helpers/calculatePoints";

export default function DatesPage() {
  return (
    <Dates
      memoTime={5}
      recallTime={15}
      title={"Dates"}
      amount={188}
      numberBerRow={1}
      rowInPage={10}
      calculatePoints={calculatePointsDates}
      standard={"National"}
      type={"dates"}
      defaultGrouping={"1"}
    />
  );
}
