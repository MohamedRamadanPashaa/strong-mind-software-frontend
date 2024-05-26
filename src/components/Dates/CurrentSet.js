import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup, language }) => {
  return (
    <div
      className={`${classes["current-set"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      <div>{currentGroup[0].split(" ")[0]}</div>
      <div>{currentGroup[0].split(" ").splice(1, 10).join(" ")}</div>
    </div>
  );
};

export default CurrentSet;
