import Card from "@/components/UIElements/Card";

const testDetails = [
  {
    title: "Object One",
    description:
      "review the Object's one table in an easy and interactive way.",
    img: "/assets/img/Object1.jpg",
    path: "/train/table-review/object-one",
  },
  {
    title: "Object Two",
    description:
      "review the Object's Two table in an easy and interactive way.",
    img: "/assets/img/Object2.jpg",
    path: "/train/table-review/object-two",
  },
  {
    title: "Action",
    description: "review the Action's table in an easy and interactive way.",
    img: "/assets/img/Action.jpg",
    path: "/train/table-review/action",
  },
];

export default function ReviewTablePage() {
  return (
    <div className={`grid`}>
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
}
