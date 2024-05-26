import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { signOut } from "next-auth/react";

import "./Dropdown.css";
import { useRef } from "react";

const Dropdown = ({ show, onClick, onCloseNavSmall, showNavSmall }) => {
  const nodeRef = useRef(null);

  const closeHandler = () => {
    onClick();

    if (showNavSmall) {
      onCloseNavSmall();
    }
  };

  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="dropdown"
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="drop-down-name" onClick={closeHandler}>
        <div>
          <Link href="/my-account" onClick={onClick}>
            My Account
          </Link>
        </div>
        <div>
          <Link href="/my-performance" onClick={onClick}>
            My Performance
          </Link>
        </div>
        <div>
          <span
            onClick={() => {
              signOut();
              closeHandler();
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Dropdown;
