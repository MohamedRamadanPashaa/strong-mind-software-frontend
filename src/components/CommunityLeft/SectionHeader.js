import classes from "./SectionHeader.module.css";

const SectionHeader = ({ children }) => {
  return <h2 className={classes["section-header"]}>{children}</h2>;
};

export default SectionHeader;
