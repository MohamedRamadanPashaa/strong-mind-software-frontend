"use client";

import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import dateFormat from "dateformat";
import { useState } from "react";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import WarningModel from "../WarningModel/WarningModel";
import Link from "next/link";
import { useSession } from "next-auth/react";

import classes from "./Competition.module.css";

const Competition = ({
  competition,
  removeDeletedCompetitionFromCompetitions,
  session,
}) => {
  const [showWarningModel, setShowWarningModel] = useState(false);
  const { data = session } = useSession();
  const user = data?.user;
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const deleteCompetitionHandler = async () => {
    try {
      await sendRequest(
        `/api/v1/competitions/delete-competition/${competition._id}`,
        "DELETE"
      );

      setShowWarningModel(false);
      removeDeletedCompetitionFromCompetitions(competition._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <WarningModel
        show={showWarningModel}
        message={`You want to delete ${competition.competitionName} season ${competition.season}?!`}
        onCancel={() => setShowWarningModel(false)}
        onConfirm={deleteCompetitionHandler}
        isLoading={isLoading}
      />

      <tr className={classes.competition}>
        <td>
          {dateFormat(competition.starts, "mmm dd")} -{" "}
          {dateFormat(competition.ends, "mmm d, yyyy")}
        </td>
        <td>
          {competition.competitionName} Season {competition.season}
        </td>
        <td className={classes.action}>
          <span>
            <Link
              href={`/competitions/${competition.slug}/${competition.season}/overview`}
            >
              Details
            </Link>
          </span>

          {user?.role === "admin" && (
            <>
              <span className={classes.update}>
                <Link
                  href={`/competitions/update-competition/${competition.slug}/${competition.season}`}
                >
                  <FaPen />
                </Link>
              </span>

              <span
                className={classes.delete}
                onClick={() => setShowWarningModel(true)}
              >
                <FaX />
              </span>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default Competition;
