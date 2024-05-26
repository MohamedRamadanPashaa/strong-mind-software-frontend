"use client";

import Numbers from "@/components/Numbers/Numbers";
import { calculatePoints30Bin } from "@/helpers/calculatePoints";

export default function BinariesPage() {
  return (
    <Numbers
      memoTime={30}
      recallTime={60}
      title={"30-Minutes Binaries"}
      amount={7530}
      numberBerRow={30}
      factor={2}
      rowInPage={6}
      calculatePoints={calculatePoints30Bin}
      standard={"World"}
      type={"binary"}
      defaultGrouping={"33"}
    />
  );
}
