import Card from "@/components/UIElements/Card";

const testDetails = [
  {
    title: "National",
    description:
      "Train your memory and develop your level with all the National Standard discipline.",
    img: "/assets/img/national.jpg",
    path: "/train/national",
  },
  {
    title: "International",
    description:
      "Train your memory and develop your level with all the International Standard discipline.",
    img: "/assets/img/international.jpg",
    path: "/train/international",
  },
  {
    title: "World",
    description:
      "Train your memory and develop your level with all the world Standard discipline.",
    img: "/assets/img/world.jpg",
    path: "/train/world",
  },
  {
    title: "Custom Training",
    description:
      "Train your memory and develop your level in all discipline with Custom Settings.",
    img: "/assets/img/custom.jpg",
    path: "/train/custom-training",
  },
  {
    title: "Review Table",
    description: "review the tables in an easy and interactive way.",
    img: "/assets/img/review-table.jpg",
    path: "/train/table-review",
  },
];

export default async function TrainPage() {
  return (
    <div className="grid">
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
}
