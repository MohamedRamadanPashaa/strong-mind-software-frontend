import Image from "next/image";

import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  recImagesArrayInOnePage,
  ranImagesArrayInOnePage,
  rowInPage,
  page,
  view,
  running,
  focusImage,
}) => {
  return (
    <div className={classes["result-sheet"]}>
      {ranImagesArrayInOnePage.map((arr, index) => {
        return (
          <div key={index} className={classes.row}>
            <div className={classes["row-num"]}>
              <span>{(page - 1) * rowInPage + index + 1}</span>
            </div>

            <div className={classes["row-random-img"]}>
              {arr.map((img, i) => {
                return (
                  <div
                    key={i}
                    className={`${classes["recalled-unit"]} ${
                      view &&
                      running &&
                      focusImage &&
                      focusImage.src === img.src
                        ? classes.focus
                        : undefined
                    }`}
                  >
                    <div className={`${classes.answers}`}>
                      <span>{img.rightAnswer}</span>
                      <span
                        className={`${
                          recImagesArrayInOnePage[index][i] !== "" &&
                          img.rightAnswer ===
                            recImagesArrayInOnePage[index][i] * 1
                            ? classes.right
                            : recImagesArrayInOnePage[index][i] === ""
                            ? classes.empty
                            : classes.wrong
                        }`}
                      >
                        {recImagesArrayInOnePage[index][i]}
                      </span>
                    </div>

                    <div className={classes.img}>
                      <Image
                        src={`/img/IAM_Images_Database/${img.src}`}
                        alt={`${img.src}`}
                        width={200}
                        height={200}
                        priority
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultSheet;
