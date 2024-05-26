import classes from "./MemoSheet.module.css";

const MemoSheet = ({
  ranImagesArrayInOnePage,
  page,
  rowInPage,
  currentGroup,
}) => {
  return (
    <div className={classes["memo-sheet"]}>
      {ranImagesArrayInOnePage.map((arr, index) => (
        <div key={index} className={classes.row}>
          <span className={classes["row-num"]}>
            {(page - 1) * rowInPage + index + 1}
          </span>

          <div className={classes["row-random-images"]}>
            {arr.map((img, i) => {
              return (
                <div
                  className={`${classes.img} ${
                    currentGroup.some((image) => image.src === img.src)
                      ? classes.highlight
                      : undefined
                  }`}
                  key={i}
                >
                  <img
                    src={`/img/IAM_Images_Database/${img.src}`}
                    alt={`${img.src}`}
                    // width={200}
                    // height={200}
                    // priority
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoSheet;
