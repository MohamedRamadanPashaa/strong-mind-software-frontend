import classes from "./FinishedHeader.module.css";

const FinishedHeader = ({ title }) => {
  return (
    <div className={classes.header}>
      <h3>{title}</h3>
      <span>Finished</span>
    </div>
  );
};

export default FinishedHeader;
