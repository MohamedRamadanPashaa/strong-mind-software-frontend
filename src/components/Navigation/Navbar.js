import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import "./NavbarAnimation.css";
import PhoneNav from "./PhoneNav";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import classes from "./Navbar.module.css";

export const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className={classes["main-nav"]}>
      <NavLogo />

      <nav className={classes.navBig}>
        <NavLinks session={session} />
      </nav>

      <PhoneNav session={session} />
    </div>
  );
};

export default Navbar;
