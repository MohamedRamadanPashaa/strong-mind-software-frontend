"use client";

import dateFormat from "dateformat";
import useHttp from "../../hooks/http-hook";
import CountDown from "../CountDown/CountDown";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import ContentEnter from "../UIElements/ContentEnter";
import { useSession } from "next-auth/react";
import Loading from "../UIElements/Loading";
import { useRef } from "react";

import classes from "./CompetitionInfo.module.css";

const CompetitionInfo = ({ competition, setCompetition }) => {
  const { data, status } = useSession();
  const user = data?.user;
  const nodeRef = useRef(null);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const registrationHandler = async () => {
    try {
      const { data } = await sendRequest(
        `/api/v1/competitions/${competition._id}`,
        "PATCH"
      );

      setCompetition(data.competition);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <Loading center />;

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["competition-info"]}>
        <h2>
          {competition.competitionName} Season {competition.season}
        </h2>
        <p>{competition.description}</p>
        <p>
          Format: <b>{competition.standard}</b> Standard.
        </p>
        <p>
          Competition Date: from{" "}
          <b>{dateFormat(competition.starts, "ddd, mmm d")}</b> to{" "}
          <b>{dateFormat(competition.ends, "ddd, mmm d, yyyy")}</b>.
        </p>

        <ContentEnter
          show={new Date(competition.regStarts).getTime() > Date.now()}
          nodeRef={nodeRef}
        >
          <div className={classes["wait-timer"]} ref={nodeRef}>
            <p>Registration will open After</p>
            <CountDown endTime={competition.regStarts} />
          </div>
        </ContentEnter>

        <ContentEnter
          show={
            new Date(competition.regStarts).getTime() < Date.now() &&
            new Date(competition.regEnds).getTime() > Date.now() &&
            user !== null &&
            !competition.participants.find((p) => p._id === user?.id)
          }
          nodeRef={nodeRef}
        >
          <div className={classes["wait-timer"]} ref={nodeRef}>
            <p>Registration will close After</p>
            <CountDown endTime={competition.regEnds} />

            <div className={classes["register-btn"]}>
              <Button onClick={registrationHandler} disabled={isLoading}>
                {isLoading ? "Please Wait" : "Register Now"}
              </Button>
            </div>
          </div>
        </ContentEnter>

        <ContentEnter
          nodeRef={nodeRef}
          show={
            new Date(competition.starts).getTime() > Date.now() &&
            new Date(competition.regStarts).getTime() < Date.now() &&
            user !== null &&
            competition.participants.find((p) => p._id === user.id) !== null
          }
        >
          <div className={classes["wait-timer"]} ref={nodeRef}>
            <p>Competition will start After</p>
            <CountDown endTime={competition.starts} />
          </div>
        </ContentEnter>

        <ContentEnter
          nodeRef={nodeRef}
          show={
            new Date(competition.starts).getTime() < Date.now() &&
            new Date(competition.ends).getTime() > Date.now() &&
            user !== null &&
            competition.participants.find((p) => p._id === user?.id) !== null
          }
        >
          <div className={classes["wait-timer"]} ref={nodeRef}>
            <p>Competition will end After</p>
            <CountDown endTime={competition.ends} />
          </div>
        </ContentEnter>
      </div>
    </>
  );
};

export default CompetitionInfo;
