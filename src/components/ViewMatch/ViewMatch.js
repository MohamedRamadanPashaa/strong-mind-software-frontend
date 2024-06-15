"use client";

import { useEffect, useState } from "react";
import { socket } from "../../helpers/socket";
import ViewRunningMatch from "./ViewRunningMatch";
import ViewResult from "./ViewResult";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";

const ViewMatch = ({ disciplineId, currentMatch, matchRunning }) => {
  const [match, setMatch] = useState(!matchRunning ? currentMatch : {});

  useEffect(() => {
    if (matchRunning) {
      socket.emit("load-match", { disciplineId, socketId: socket.id });

      socket.on("send-match", (data) => {
        disciplineId === data?.disciplineId && setMatch(data);
      });
    }
  }, [disciplineId, matchRunning]);

  return (
    <>
      <DisciplineCard>
        {match?.competitor && (
          <>
            {matchRunning && (
              <ViewRunningMatch
                match={match}
                disciplineId={disciplineId}
                setMatch={setMatch}
              />
            )}

            {!matchRunning && <ViewResult match={match} />}
          </>
        )}
      </DisciplineCard>
    </>
  );
};

export default ViewMatch;
