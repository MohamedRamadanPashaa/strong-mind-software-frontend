import React from "react";
import { useSelector } from "react-redux";
import Button from "../FormElement/Button";

import classes from "./Result.module.css";

const Result = ({ dispatch, title }) => {
  const { score, time, mistakes } = useSelector((state) => state.result);

  return (
    <div className={classes.result}>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Mistakes</th>
            <th>Time</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{score}</td>
            <td>{mistakes}</td>
            <td>{time / 1000} s</td>
            <td>{(score / 100) * 100}%</td>
          </tr>
        </tbody>
      </table>
      <Button
        outline
        className={classes.btn}
        onClick={() => dispatch({ type: "COUNTDOWN" })}
      >
        Another Game
      </Button>
    </div>
  );
};

export default Result;
