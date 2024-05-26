import React from "react";
import Button from "../FormElement/Button";
import Modal from "../Modal/Modal";

const WarningModel = ({ show, message, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      show={show}
      header="Are you sure!"
      onCancel={onCancel}
      footer={
        <>
          <Button onClick={onConfirm} danger={true} disabled={isLoading}>
            {isLoading ? "deleting..." : "Confirm"}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
};

export default WarningModel;
