import { CSSTransition } from "react-transition-group";

import "./UpDownAnimation.css";

const UpDownAnimation = ({ show, children }) => {
  return (
    <CSSTransition in={show} unmountOnExit timeout={500} classNames="page">
      {children}
    </CSSTransition>
  );
};

export default UpDownAnimation;
