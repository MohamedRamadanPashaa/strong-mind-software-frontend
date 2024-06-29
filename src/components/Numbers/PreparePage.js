import NumberInstructions from "./NumberInstructions";
import PreviewNumbers from "./PreviewNumbers";
import PrepareCard from "../ShareDiscipline/PrepareCard";
import NumbersGroupingInput from "./NumbersGroupingInput";
import SelectElement from "../UIElements/SelectElement";
import SpokenInstructions from "./SpokenInstructions";
import { useEffect, useState } from "react";

const PreparePage = ({
  title,
  countSeconds,
  setCountSeconds,
  memoTime,
  setMemoTime,
  recallTime,
  setRecallTime,
  grouping,
  setGrouping,
  groupingArray,
  setGroupingArray,
  isValid,
  numberBerRow,
  factor,
  startCountDownHandler,
  custom,
  amount,
  setAmount,
  standard,
  isLoading,
  type,
  preloadData,
  preloadDataHandler,
  resetDataHandler,
  spokenInterval,
  setSpokenInterval,
  loadedAmount,
}) => {
  const [attempt, setAttempt] = useState(1);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttempt(localStorage.getItem(`${type}Attempt`) || 1);
    }
  }, [setAttempt, type]);

  return (
    <PrepareCard
      title={title}
      standard={standard}
      preloadData={preloadData}
      preloadDataHandler={preloadDataHandler}
      startCountDownHandler={startCountDownHandler}
      isValid={isValid}
      isLoading={isLoading}
      amount={amount}
      memoTime={memoTime}
      recallTime={recallTime}
      custom={custom}
      countSeconds={countSeconds}
      setCountSeconds={setCountSeconds}
      type={type}
      setAmount={setAmount}
      setMemoTime={setMemoTime}
      setRecallTime={setRecallTime}
      resetDataHandler={resetDataHandler}
      loadedAmount={loadedAmount}
      instructionsDiscipline={
        type === "spoken" ? (
          <SpokenInstructions />
        ) : (
          <NumberInstructions numberBerRow={numberBerRow} />
        )
      }
      preview={
        groupingArray && (
          <PreviewNumbers
            groupingArray={groupingArray}
            factor={factor}
            setGroupingArray={setGroupingArray}
            grouping={grouping}
          />
        )
      }
      groupingInput={
        <NumbersGroupingInput
          grouping={grouping}
          type={type}
          setGrouping={setGrouping}
        />
      }
      SelectAttempt={
        <SelectElement
          length={3}
          label={"Select Attempt (100, 300, and 550)"}
          value={attempt}
          onChange={(e) => {
            localStorage.setItem(`${type}Attempt`, e.target.value);
            setAttempt(e.target.value);
            if (e.target.value === "1") {
              localStorage.setItem(`${type}Amount`, 100);
              setAmount(100);
              setRecallTime(5);
              setMemoTime(110 / 60);
            } else if (e.target.value === "2") {
              localStorage.setItem(`${type}Amount`, 300);
              setAmount(300);
              setRecallTime(15);
              setMemoTime(310 / 60);
            } else if (e.target.value === "3") {
              localStorage.setItem(`${type}Amount`, 550);
              setAmount(550);
              setRecallTime(25);
              setMemoTime(560 / 60);
            }
          }}
        />
      }
      selectSpokenInterval={
        <SelectElement
          optionsArray={[
            700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
            1900, 2000,
          ]}
          label={"Interval (ms)"}
          value={spokenInterval}
          onChange={(e) => {
            setSpokenInterval(e.target.value * 1);
            localStorage.setItem("spokenInterval", e.target.value);
          }}
        />
      }
    />
  );
};

export default PreparePage;
