"use client";

import Words from "@/components/Words/Words";
import { calculatePoints15Words } from "@/helpers/calculatePoints";

export default function WordsPage() {
  return (
    <Words
      memoTime={15}
      recallTime={40}
      title={"15-Minutes Words"}
      amount={400}
      numberBerRow={20}
      rowInPage={3}
      calculatePoints={calculatePoints15Words}
      standard={"International"}
      type={"words"}
      defaultGrouping={"1"}
    />
  );
}
