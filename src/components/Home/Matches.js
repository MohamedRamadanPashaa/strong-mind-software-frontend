"use client";

import { useEffect } from "react";
import OneMatch from "./OneMatch";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/helpers/socket";
import { setMatches } from "@/store/resultSlice";

import classes from "./Matches.module.css";

const Matches = () => {
  const dispatch = useDispatch();
  const { matches } = useSelector((state) => state.result);

  useEffect(() => {
    socket.emit("load-matches");

    socket.on("get-matches", (matches) => {
      dispatch(setMatches(matches));
    });
  }, [dispatch]);

  return (
    <div className={classes.matches}>
      <h3>Current Matches</h3>

      <div className={classes["current-matches"]}>
        {matches.length > 0 &&
          matches.map((match) => (
            <div key={match.disciplineId}>
              <OneMatch match={match} />
            </div>
          ))}

        {matches.length === 0 && <div>No matches running now.</div>}
      </div>
    </div>
  );
};

export default Matches;
