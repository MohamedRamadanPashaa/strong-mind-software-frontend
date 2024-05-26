"use client";

import Images from "@/components/Images/Images";
import { calculatePoints5Img } from "@/helpers/calculatePoints";

export default function LongNumbersPage() {
  return (
    <Images
      memoTime={5}
      recallTime={20}
      title={"Images"}
      amount={660}
      numberBerRow={5}
      rowInPage={3}
      calculatePoints={calculatePoints5Img}
      standard={"World"}
      type={"images"}
      defaultGrouping={"1"}
    />
  );
}
