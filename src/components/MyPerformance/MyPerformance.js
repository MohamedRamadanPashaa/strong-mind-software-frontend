"use client";

import { useEffect, useState } from "react";
import useHttp from "../../hooks/http-hook";

import LineChartComponent from "./LineChartComponent";
import SelectDiscipline from "../SelectDiscipline/SelectDiscipline";
import { AllDiscipline } from "../../PaginationData/AllDiscipline";
import TableTop5 from "./TableTop5";

import classes from "./MyPerformance.module.css";

const MyPerformance = () => {
  const { sendRequest } = useHttp();
  const [numberOfGames, setNumberOfGames] = useState(0);
  const [personalBest, setPersonalBest] = useState([]);
  const [monthlyGames, setMonthlyGames] = useState([]);
  const [scoresArr, setScoresArr] = useState([]);
  const [title, setTitle] = useState("Speed Numbers");

  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/disciplines/performance-stats?discipline=${title}`
        );

        setScoresArr(data.scoresArr);
        setNumberOfGames(data.numberOfGames);
        setPersonalBest(data.personalBest);
        setMonthlyGames(data.monthlyGames);
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, [sendRequest, title]);

  return (
    <div className={classes.stats}>
      <SelectDiscipline
        selectData={AllDiscipline}
        title={title}
        setTitle={setTitle}
        className={"custom-select"}
      />

      <>
        {numberOfGames > 0 && (
          <div className={classes.cards}>
            <div>
              <span>Total Games</span>
              <span>{numberOfGames}</span>
            </div>
            <div>
              <span>Best Score</span>
              <span>{personalBest[0].score}</span>
            </div>

            {monthlyGames.length >= 5 && (
              <div>
                <span>Attempt Increment</span>
                <span>
                  {Math.round(
                    (Math.max(...scoresArr) - scoresArr[0]) /
                      monthlyGames.length
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {monthlyGames.length > 0 && (
          <div className={classes.chart}>
            <h4>
              Results of last {monthlyGames.length} attempt
              {monthlyGames.length > 1 && "s"} during last 3 months
            </h4>
            <LineChartComponent data={monthlyGames} />
          </div>
        )}

        {monthlyGames.length === 0 && personalBest.length !== 0 && (
          <p className={classes["no-results"]}>
            No Results Found in last 3 months for <br />
            <b style={{ color: "var(--orange)" }}>{title}</b> Discipline.
            <br />
            Please play to view your chart.
          </p>
        )}

        {personalBest.length > 0 && (
          <TableTop5 results={personalBest} title={title} />
        )}

        {monthlyGames.length === 0 && personalBest.length === 0 && (
          <p className={classes["no-results"]}>
            No Results Found for <br />
            <b style={{ color: "var(--orange)" }}>{title}</b>
            <br />
            Discipline.
          </p>
        )}
      </>
    </div>
  );
};

export default MyPerformance;
