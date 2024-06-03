import classes from "./Loading.module.css";

const Loading = ({ center, className }) => {
  return (
    <div className={`${center && "center"} loading ${className}`}>
      <div className={classes["lds-hourglass"]}></div>
    </div>
  );
};

export default Loading;
