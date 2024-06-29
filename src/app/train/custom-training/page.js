import Card from "@/components/UIElements/Card";

export const metadata = {
  title: "Custom Training",
};

const testDetails = [
  {
    title: "Numbers",
    description:
      "Try to memorize as many random numbers as possible with custom settings.",
    img: "/assets/img/speed-numbers.jpg",
    path: "/train/custom-training/numbers",
  },
  {
    title: "Binaries",
    description:
      "Try to memorize as many random Binaries as possible  with custom settings.",
    img: "/assets/img/binary.jpg",
    path: "/train/custom-training/binaries",
  },
  {
    title: "Images",
    description:
      "Try to memorize as many random images as possible with custom settings.",
    img: "/assets/img/images.jpg",
    path: "/train/custom-training/images",
  },
  {
    title: "Cards",
    description:
      "Try to memorize as many random cards as possible with custom settings.",
    img: "/assets/img/speed-cards.jpg",
    path: "/train/custom-training/cards",
  },
  {
    title: "Words",
    description:
      "Try to memorize as many random words as possible with custom settings.",
    img: "/assets/img/words.jpg",
    path: "/train/custom-training/words",
  },
  {
    title: "Dates",
    description:
      "Try to memorize as many dates as possible with custom settings.",
    img: "/assets/img/dates.jpg",
    path: "/train/custom-training/dates",
  },
  {
    title: "Names",
    description:
      "Try to memorize as many names as possible with custom settings.",
    img: "/assets/img/faces.jpg",
    path: "/train/custom-training/names",
  },
  {
    title: "Spoken Numbers",
    description:
      "Try to memorize as many random number as possible spoke each number in 1 sec.",
    img: "/assets/img/Spoken.jpg",
    path: "/train/custom-training/spoken-numbers",
  },
];

export default function page() {
  return (
    <div className={`grid`}>
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
}
