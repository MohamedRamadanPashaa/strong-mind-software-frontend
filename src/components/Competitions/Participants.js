import Image from "next/image";

import classes from "./Participants.module.css";

const Participants = ({ participants }) => {
  return (
    <div className={classes.participants}>
      <h3>Participants</h3>

      <div className={classes["participants-list"]}>
        {participants.map((participant) => (
          <div key={participant._id} title={participant.name}>
            <Image
              src={`/img/usersImages/${participant.photo}`}
              alt={participant.name}
              width={150}
              height={150}
            />

            <h4>{participant.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
