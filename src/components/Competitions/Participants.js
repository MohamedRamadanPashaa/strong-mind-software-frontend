import Image from "next/image";
import { useSession } from "next-auth/react";
import DeleteParticipants from "./DeleteParticipants";

import classes from "./Participants.module.css";

const Participants = ({
  title,
  participants,
  onRemoveParticipant,
  isLoading,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <div className={classes.participants}>
        <h3>{title}</h3>

        <div className={classes["participants-list"]}>
          {participants.map((participant) => (
            <div key={participant._id} title={participant.name}>
              {(session?.user?.role === "admin" ||
                session?.user?.role === "coach") && (
                <DeleteParticipants
                  participant={participant}
                  onRemoveParticipant={onRemoveParticipant}
                  isLoading={isLoading}
                />
              )}
              <Image
                src={
                  participant?.photo?.secure_url
                    ? participant.photo.secure_url
                    : `/img/usersImages/default.jpg`
                }
                alt={participant.name}
                width={150}
                height={150}
                priority
              />

              <h4>{participant.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Participants;
