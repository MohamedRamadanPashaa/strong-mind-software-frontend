import { FaX } from "react-icons/fa6";
import WarningModel from "../WarningModel/WarningModel";
import { useState } from "react";

import classes from "./DeleteParticipants.module.css";

export default function DeleteParticipants({
  participant,
  onRemoveParticipant,
  isLoading,
}) {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <WarningModel
        show={showWarning}
        message={`You want to delete ${participant.name}.`}
        onCancel={() => setShowWarning(false)}
        onConfirm={() => onRemoveParticipant(participant._id)}
        isLoading={isLoading}
      />

      <span
        className={classes.delete}
        onClick={() => setShowWarning((prev) => !prev)}
      >
        <FaX />
      </span>
    </>
  );
}
