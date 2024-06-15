"use client";

import { useState } from "react";
import CompetitionInfo from "./CompetitionInfo";
import Participants from "./Participants";
import useHttp from "@/hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";

import classes from "./CompetitionPage.module.css";

const CompetitionPage = ({ competition }) => {
  const [participants, setParticipants] = useState(competition.participants);
  const { isLoading, sendRequest, error, clearError } = useHttp();

  const removeCompetitorFromCompetition = async (id) => {
    try {
      const { data } = await sendRequest(
        `/api/v1/competitions/delete-competitor/${competition._id}/${id}`,
        "DELETE"
      );

      setParticipants(data.competition.participants);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["competition-page"]}>
        <CompetitionInfo
          competition={competition}
          setParticipants={setParticipants}
          participants={participants}
        />

        <Participants
          participants={participants}
          onRemoveParticipant={removeCompetitorFromCompetition}
          isLoading={isLoading}
          title="Participants"
        />
      </div>
    </>
  );
};

export default CompetitionPage;
