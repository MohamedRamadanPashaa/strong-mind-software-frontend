import classes from "./FocusImage.module.css";

const FocusImage = ({ focusImage }) => {
  return (
    <div className={classes["focus-image"]}>
      <span className={classes.answer}>{focusImage.answer}</span>
      <div className={classes.img}>
        <img
          src={`/img/IAM_Images_Database/${focusImage.src}`}
          alt={`${focusImage.src}`}
          // width={400}
          // height={400}
          // priority
        />
      </div>
    </div>
  );
};

export default FocusImage;
