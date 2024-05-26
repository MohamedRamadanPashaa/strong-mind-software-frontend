import { CSSTransition } from "react-transition-group";

import "./ScrollToBottomTransition.css";

const ScrollToBottomTransition = ({ show, children }) => {
  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="scroll-btn"
    >
      {children}
    </CSSTransition>
  );
};

export default ScrollToBottomTransition;
