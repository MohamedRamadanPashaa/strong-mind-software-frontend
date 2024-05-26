import Card from "@/components/UIElements/Card";

const testDetails = [
  {
    title: "Speed Numbers",
    description:
      "Try to memorize as many random numbers as possible in 5 minutes.",
    img: "/assets/img/speed-numbers.jpg",
    path: "/train/world/speed-numbers",
  },
  {
    title: "Hour Numbers",
    description:
      "Try to memorize as many random numbers as possible in an hour.",
    img: "/assets/img/numbers.jpg",
    path: "/train/world/hour-numbers",
  },
  {
    title: "30-Mins Binaries",
    description:
      "Try to memorize as many random Binaries as possible in 30 minutes.",
    img: "/assets/img/binary.jpg",
    path: "/train/world/30-mins-binaries",
  },
  {
    title: "Images",
    description:
      "Try to memorize as many random images as possible in 5 minutes.",
    img: "/assets/img/images.jpg",
    path: "/train/world/images",
  },
  {
    title: "Speed Cards",
    description: "Try to memorize the 52 cards in less than 5 minutes.",
    img: "/assets/img/speed-cards.jpg",
    path: "/train/world/speed-cards",
  },
  {
    title: "Hour Cards",
    description: "Try to memorize as many random cards as possible in an hour.",
    img: "/assets/img/long-cards.jpg",
    path: "/train/world/hour-cards",
  },
  {
    title: "Spoken Numbers",
    description:
      "Try to memorize as many random number as possible spoke each number in 1 sec.",
    img: "/assets/img/Spoken.jpg",
    path: "/train/world/spoken-numbers",
  },
  {
    title: "15-Mins Words",
    description:
      "Try to memorize as many random words as possible in 15 minutes.",
    img: "/assets/img/words.jpg",
    path: "/train/world/15-mins-words",
  },
  {
    title: "Dates",
    description: "Try to memorize as many dates as possible in 5 minutes.",
    img: "/assets/img/dates.jpg",
    path: "/train/world/dates",
  },

  {
    title: "15-Mins Names",
    description: "Try to memorize as many names as possible in 15 minutes.",
    img: "/assets/img/faces.jpg",
    path: "/train/world/15-mins-names",
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
