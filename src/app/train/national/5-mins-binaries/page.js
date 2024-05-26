"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints5Bin } from "@/helpers/calculatePoints";

export default function BinariesPage() {
  return (
    <Numbers
      memoTime={5}
      recallTime={15}
      title={"5-Minutes Binaries"}
      amount={1530}
      numberBerRow={30}
      factor={2}
      rowInPage={6}
      calculatePoints={calculatePoints5Bin}
      standard={"National"}
      type={"binary"}
      defaultGrouping={"33"}
    />
  );
}
