import Modal from "../Modal/Modal";
import Button from "../FormElement/Button";

import classes from "./Prompt.module.css";

const Prompt = ({ show, onCancel, onConfirm }) => {
  return (
    <Modal
      show={show}
      header={"Are You Sure?!"}
      onCancel={onCancel}
      footer={
        <>
          <Button onClick={onConfirm} danger={true}>
            Ok
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </>
      }
    >
      <p>You want to leave this page?!</p>
    </Modal>
  );
};

export default Prompt;
