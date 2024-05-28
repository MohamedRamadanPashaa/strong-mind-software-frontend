import { CSSTransition } from "react-transition-group";

import "./Menu.css";

const Menu = ({ show, children, nodeRef }) => {
  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="dropdown-menu"
      nodeRef={nodeRef}
    >
      <div>{children}</div>
    </CSSTransition>
  );
};

export default Menu;
