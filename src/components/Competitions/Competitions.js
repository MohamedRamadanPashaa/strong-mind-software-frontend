"use client";

import { useState } from "react";
import Competition from "./Competition";

import classes from "./Competitions.module.css";

export default function Competitions({
  competitions: existingCompetitions,
  session,
}) {
  const [competitions, setCompetitions] = useState(existingCompetitions);

  const removeDeletedCompetitionFromCompetitions = (id) => {
    setCompetitions(competitions.filter((comp) => comp._id !== id));
  };

  return (
    <table className={classes["competition-table"]}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Competition</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {competitions?.map((competition) => (
          <Competition
            key={competition._id}
            competition={competition}
            removeDeletedCompetitionFromCompetitions={
              removeDeletedCompetitionFromCompetitions
            }
            session={session}
          />
        ))}
      </tbody>
    </table>
  );
}
