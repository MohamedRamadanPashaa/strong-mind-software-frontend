import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";

import "./ModalTransition.css";

const ModalOverlay = ({ header, children, footer, onSubmit, nodeRef }) => {
  const content = (
    <div className={classes.backdrop} ref={nodeRef}>
      <header>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div>{children}</div>
      </form>
      <footer>{footer}</footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const nodeRef = useRef(null);
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} nodeRef={nodeRef} />
      </CSSTransition>
    </>
  );
};

export default Modal;
