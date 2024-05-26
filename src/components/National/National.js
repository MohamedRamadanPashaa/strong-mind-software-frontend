import Card from "../UIElements/Card";

import speedNumberImg from "../../assets/img/speed-numbers 1.jpg";
import longNumberImg from "../../assets/img/numbers.jpg";
import binaryImg from "../../assets/img/binary.jpg";
import longCardImg from "../../assets/img/long-cards.jpg";
import speedCardImg from "../../assets/img/speed-cards.jpg";
import wordsImg from "../../assets/img/words.jpg";
import facesImg from "../../assets/img/faces.jpg";
import spokenImg from "../../assets/img/Spoken.jpg";
import imageImg from "../../assets/img/images.jpg";
import datesImg from "../../assets/img/dates.jpg";

import classes from "./National.module.css";

const testDetails = [
  {
    title: "Speed Numbers",
    description:
      "Try to memorize as many random numbers as possible in 5 minutes.",
    img: speedNumberImg,
    path: "speed-numbers",
  },
  {
    title: "15-Mins Numbers",
    description:
      "Try to memorize as many random numbers as possible in 15 minutes.",
    img: longNumberImg,
    path: "15-mins-numbers",
  },
  {
    title: "5-Mins Binaries",
    description:
      "Try to memorize as many random Binaries as possible in 5 minutes.",
    img: binaryImg,
    path: "5-mins-binaries",
  },
  {
    title: "Images",
    description:
      "Try to memorize as many random images as possible in 5 minutes.",
    img: imageImg,
    path: "images",
  },
  {
    title: "Speed Cards",
    description: "Try to memorize the 52 cards in less than 5 minutes.",
    img: speedCardImg,
    path: "speed-cards",
  },
  {
    title: "10-Mins Cards",
    description:
      "Try to memorize as many random cards as possible in 10 minutes.",
    img: longCardImg,
    path: "10-mins-cards",
  },
  {
    title: "Spoken Numbers",
    description:
      "Try to memorize as many random number as possible spoke each number in 1 sec.",
    img: spokenImg,
    path: "spoken-numbers",
  },
  {
    title: "5-Mins Words",
    description:
      "Try to memorize as many random words as possible in 5 minutes.",
    img: wordsImg,
    path: "5-mins-words",
  },
  {
    title: "Dates",
    description: "Try to memorize as many dates as possible in 5 minutes.",
    img: datesImg,
    path: "dates",
  },
  {
    title: "5-Mins Names",
    description: "Try to memorize as many names as possible in 5 minutes.",
    img: facesImg,
    path: "5-mins-names",
  },
];

const National = () => {
  return (
    <div className={`grid ${classes.national}`}>
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
};

export default National;
