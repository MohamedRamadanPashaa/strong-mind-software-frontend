import classes from "./DisciplineCard.module.css";

const DisciplineCard = ({ children }) => {
  return (
    <div className={classes["discipline-card"]}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default DisciplineCard;
