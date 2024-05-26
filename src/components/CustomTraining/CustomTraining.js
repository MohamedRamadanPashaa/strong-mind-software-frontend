import Card from "../UIElements/Card";

import speedNumberImg from "../../assets/img/speed-numbers 1.jpg";
import binaryImg from "../../assets/img/binary.jpg";
import speedCardImg from "../../assets/img/speed-cards.jpg";
import wordsImg from "../../assets/img/words.jpg";
import facesImg from "../../assets/img/faces.jpg";
import spokenImg from "../../assets/img/Spoken.jpg";
import imageImg from "../../assets/img/images.jpg";
import datesImg from "../../assets/img/dates.jpg";

import classes from "./CustomTraining.module.css";

const testDetails = [
  {
    title: "Numbers",
    description:
      "Try to memorize as many random numbers as possible with custom settings.",
    img: speedNumberImg,
    path: "numbers",
  },
  {
    title: "Binaries",
    description:
      "Try to memorize as many random Binaries as possible  with custom settings.",
    img: binaryImg,
    path: "binaries",
  },
  {
    title: "Images",
    description:
      "Try to memorize as many random images as possible with custom settings.",
    img: imageImg,
    path: "images",
  },
  {
    title: "Cards",
    description:
      "Try to memorize as many random cards as possible with custom settings.",
    img: speedCardImg,
    path: "cards",
  },
  {
    title: "Words",
    description:
      "Try to memorize as many random words as possible with custom settings.",
    img: wordsImg,
    path: "words",
  },
  {
    title: "Dates",
    description:
      "Try to memorize as many dates as possible with custom settings.",
    img: datesImg,
    path: "dates",
  },
  {
    title: "Names",
    description:
      "Try to memorize as many names as possible with custom settings.",
    img: facesImg,
    path: "names",
  },
  {
    title: "Spoken Numbers",
    description:
      "Try to memorize as many random number as possible spoke each number in 1 sec.",
    img: spokenImg,
    path: "spoken-numbers",
  },
];

const CustomTraining = () => {
  return (
    <div className={`grid ${classes["custom-training"]}`}>
      {testDetails.map((test) => (
        <Card key={test.title} {...test} />
      ))}
    </div>
  );
};

export default CustomTraining;
