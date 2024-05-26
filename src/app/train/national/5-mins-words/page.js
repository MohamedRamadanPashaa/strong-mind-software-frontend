"use client";

import Words from "@/components/Words/Words";
import { calculatePoints5Words } from "@/helpers/calculatePoints";

export default function WordsPage() {
  return (
    <Words
      memoTime={5}
      recallTime={15}
      title={"5-Minutes Words"}
      amount={180}
      numberBerRow={20}
      rowInPage={3}
      calculatePoints={calculatePoints5Words}
      standard={"National"}
      type={"words"}
      defaultGrouping={"1"}
    />
  );
}
