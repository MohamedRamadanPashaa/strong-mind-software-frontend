"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { socket } from "../../helpers/socket";
import useHttp from "../../hooks/http-hook";
import ViewRunningMatch from "./ViewRunningMatch";
import ErrorModal from "../ErrorModal/ErrorModal";
import ViewResult from "./ViewResult";

import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import Loading from "../UIElements/Loading";

const ViewMatch = ({ disciplineId }) => {
  const [match, setMatch] = useState({});
  const [matchRunning, setMatchRunning] = useState(true);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  useLayoutEffect(() => {
    socket.emit("load-match", { disciplineId, socketId: socket.id });

    socket.on("send-match", (data) => {
      data === null && setMatchRunning(false);

      data !== null && disciplineId === data.disciplineId && setMatch(data);
    });
  }, [disciplineId]);

  // get match from DB
  useLayoutEffect(() => {
    const getDiscipline = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/disciplines/get-discipline/${disciplineId}`
        );

        setMatch(data.discipline);
      } catch (error) {
        console.log(error);
      }
    };

    !matchRunning && getDiscipline();
  }, [sendRequest, disciplineId, matchRunning]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <DisciplineCard>
        {isLoading && <Loading center />}

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
