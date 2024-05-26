import Link from "next/link";

import classes from "./NavLogo.module.css";

const NavLogo = () => {
  return (
    <h1 className={classes.logo}>
      <Link href="/">Strong Mind</Link>
    </h1>
  );
};

export default NavLogo;
