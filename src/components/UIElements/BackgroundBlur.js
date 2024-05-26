import classes from "./BackgroundBlur.module.css";

const BackgroundBlur = () => {
  return (
    <>
      <div className={classes.blur + ` ${classes["blur-left"]}`}></div>
      <div className={classes.blur + ` ${classes["blur-right"]}`}></div>
    </>
  );
};

export default BackgroundBlur;
