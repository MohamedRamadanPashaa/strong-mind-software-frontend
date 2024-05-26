import Card from "../UIElements/Card";

import actionImg from "../../assets/img/Action.jpg";
import objectOneImg from "../../assets/img/Object1.jpg";
import objectTwoImg from "../../assets/img/Object2.jpg";

import classes from "./TableReview.module.css";

const testDetails = [
  {
    title: "Object One",
    description:
      "review the Object's one table in an easy and interactive way.",
    img: objectOneImg,
    path: "object-one",
  },
  {
    title: "Object Two",
    description:
      "review the Object's Two table in an easy and interactive way.",
    img: objectTwoImg,
    path: "object-two",
  },
  {
    title: "Action",
    description: "review the Action's table in an easy and interactive way.",
    img: actionImg,
    path: "action",
  },
];

const TableReview = () => {
  return (
    <div className={`grid ${classes["table-review"]}`}>
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
};

export default TableReview;
