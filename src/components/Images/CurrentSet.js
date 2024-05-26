import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup }) => {
  console.log(currentGroup);
  return (
    <div
      className={`${classes["current-set"]} ${
        currentGroup.length === 1
          ? classes["one-img"]
          : currentGroup.length > 1
          ? classes["more-two-img"]
          : undefined
      }`}
    >
      {currentGroup.map((img, index) => (
        <div key={index} className={classes.img}>
          <img
            src={`/img/IAM_Images_Database/${img.src}`}
            alt={`${img.src}`}
            // width={400}
            // height={400}
          />
        </div>
      ))}
    </div>
  );
};

export default CurrentSet;
