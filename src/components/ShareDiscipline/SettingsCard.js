import classes from "./SettingsCard.module.css";

const SettingsCard = ({ children }) => {
  return <div className={classes.settings}>{children}</div>;
};

export default SettingsCard;
