import { CSSTransition } from "react-transition-group";

import "./Menu.css";

const Menu = ({ show, children }) => {
  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="dropdown-menu"
    >
      {children}
    </CSSTransition>
  );
};

export default Menu;
