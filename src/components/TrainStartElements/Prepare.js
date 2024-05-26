import { useEffect, useState } from "react";
import Button from "../FormElement/Button";

import classes from "./Prepare.module.css";

const arrayNumber = () => {
  let numArray = [];
  for (let i = 0; i < 100; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;

    numArray.push(num);
  }
  return numArray;
};

const Prepare = ({ title, dispatch }) => {
  const startTestHandler = () => {
    dispatch({ type: "COUNTDOWN" });
  };
  const [loadedImg, setLoadedImg] = useState(title === "Action" ? 100 : 0);

  // preload images if object one
  useEffect(() => {
    const preloadImageHandler = async (table) => {
      const imgArr = arrayNumber();
      let loadedArr = [];

      const promises = await imgArr.map((image, i) => {
        return new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = function () {
            resolve(`/img/${table}/${image}.jpg`);
            console.log(img);
            loadedArr.push(i);
            setLoadedImg(loadedArr.length);
            if (loadedArr.length === 100) {
              console.log("done");
            }
          };

          img.onerror = () => reject();
          img.src = `/img/${table}/${image}.jpg`;
        });
      });

      await Promise.all(promises);
    };

    if (title === "Object One") {
      preloadImageHandler("O1");
    } else if (title === "Object Two") {
      preloadImageHandler("O2");
    }
  }, [title]);

  return (
    <div className={classes.trainStart}>
      <h2>{title}</h2>
      <p>
        You have 100 multiple-choice questions. Try to answer them correctly as
        quickly as possible.
      </p>
      <Button
        disabled={loadedImg < 100}
        onClick={startTestHandler}
        className={classes.button}
        outline
      >
        {loadedImg < 100 ? `Loading Images... ${loadedImg}%` : "Start"}
      </Button>
    </div>
  );
};

export default Prepare;
