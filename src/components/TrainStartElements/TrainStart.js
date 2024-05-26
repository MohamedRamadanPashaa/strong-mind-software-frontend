"use client";

import { useReducer } from "react";

import Prepare from "./Prepare";
import CountDown from "./CountDown";
import MainQuestion from "./MainQuestion";
import Saving from "./Saving";
import Result from "../Result/Result";

const initialState = {
  prepare: true,
  countdown: false,
  question: false,
  saving: false,
  result: false,
};

const dispatchHandler = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state };
    case "COUNTDOWN":
      return {
        ...state,
        prepare: false,
        countdown: true,
        saving: false,
        result: false,
      };
    case "QUESTION":
      return {
        ...state,
        countdown: false,
        question: true,
        saving: false,
        result: false,
      };
    case "SAVING":
      return {
        ...state,
        countdown: false,
        question: false,
        saving: true,
        result: false,
      };
    case "RESULT":
      return {
        ...state,
        countdown: false,
        question: false,
        saving: false,
        result: true,
      };

    default:
      return initialState;
  }
};

const TrainStart = ({ title }) => {
  const [state, dispatch] = useReducer(dispatchHandler, initialState);
  const { prepare, countdown, question, result, saving } = state;

  return (
    <>
      {prepare && <Prepare dispatch={dispatch} title={title} />}
      {countdown && (
        <CountDown
          startMemoHandler={() => dispatch({ type: "QUESTION" })}
          view={true}
          text={"Test will start after"}
        />
      )}
      {question && <MainQuestion dispatch={dispatch} title={title} />}

      {saving && <Saving title={title} dispatch={dispatch} />}

      {result && <Result dispatch={dispatch} title={title} />}
    </>
  );
};

export default TrainStart;
