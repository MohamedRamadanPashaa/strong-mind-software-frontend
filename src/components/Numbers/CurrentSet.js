import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup }) => {
  return (
    <div className={classes["numbers-set-lab"]}>
      <div className={classes["current-set"]}>
        {currentGroup.map((arr, index) => (
          <div key={index}>
            {arr.map((num, index) => (
              <span key={index}>{num}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentSet;
