"use client";

import { CSSTransition } from "react-transition-group";
import Backdrop from "../Modal/Backdrop";
import NavLinks from "./NavLinks";
import { useRef, useState } from "react";

import classes from "./Navbar.module.css";

export default function PhoneNav({ session }) {
  const [showNavSmall, setShowNavSmall] = useState(false);

  const toggleNavSmallHandler = () => setShowNavSmall((prev) => !prev);

  const nodeRef = useRef(null);

  const closeNavSmallHandler = () => setShowNavSmall(false);
  return (
    <>
      {showNavSmall && <Backdrop onClick={closeNavSmallHandler} />}
      <nav className={classes.navSmall}>
        <CSSTransition
          in={showNavSmall}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames="slide-in-left"
          nodeRef={nodeRef}
        >
          <NavLinks
            onCloseNavSmall={closeNavSmallHandler}
            showNavSmall={showNavSmall}
            session={session}
            nodeRef={nodeRef}
          />
        </CSSTransition>
      </nav>

      <div onClick={toggleNavSmallHandler} className={classes.burgerIcon}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
