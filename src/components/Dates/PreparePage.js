import { AvailableDatesLanguages } from "../../Data/Languages";
import PrepareCard from "../ShareDiscipline/PrepareCard";
import SelectElement from "../UIElements/SelectElement";

import DatesInstructions from "./DatesInstructions";

const PreparePage = ({
  title,
  countSeconds,
  setCountSeconds,
  memoTime,
  setMemoTime,
  recallTime,
  setRecallTime,
  isValid,
  numberBerRow,
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
  language,
  setLanguage,
}) => {
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
      instructionsDiscipline={<DatesInstructions numberBerRow={numberBerRow} />}
      selectLanguage={
        <SelectElement
          value={language}
          label={"Language"}
          onChange={(e) => {
            localStorage.setItem(`${type}Language`, e.target.value);
            setLanguage(e.target.value);
          }}
          optionsArray={AvailableDatesLanguages}
        />
      }
      language={language}
    />
  );
};

export default PreparePage;
