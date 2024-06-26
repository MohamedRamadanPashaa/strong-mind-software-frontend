import { CSSTransition } from "react-transition-group";
import "./ContentEnter.css";

const ContentEnter = ({ show, children, nodeRef }) => {
  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={300}
      classNames="content"
      nodeRef={nodeRef}
    >
      {children}
    </CSSTransition>
  );
};

export default ContentEnter;
