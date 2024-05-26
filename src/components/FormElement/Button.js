import Link from "next/link";
import classes from "./Button.module.css";

const Button = ({
  to,
  children,
  onClick,
  className,
  outline,
  disabled,
  type,
  danger,
}) => {
  if (to) {
    return (
      <Link
        className={`${classes.btn} ${
          outline && classes.btnOutline
        } ${className} ${danger && classes.danger}`}
        href={to}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        className={`${classes.btn} ${
          outline ? classes.btnOutline : undefined
        } ${className} ${danger && classes.danger}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;
