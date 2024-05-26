import { AvailableWordsLanguages } from "../../Data/Languages";
import PrepareCard from "../ShareDiscipline/PrepareCard";
import SelectElement from "../UIElements/SelectElement";
import WordsInstructions from "./WordsInstructions";

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
      language={language}
      instructionsDiscipline={<WordsInstructions numberBerRow={numberBerRow} />}
      groupingInput={
        <SelectElement
          length={5}
          value={grouping}
          label={"Grouping (1-5)"}
          onChange={(e) => {
            localStorage.setItem(`${type}Grouping`, e.target.value);
            setGrouping(e.target.value);
          }}
        />
      }
      selectLanguage={
        <SelectElement
          value={language}
          label={"Language"}
          onChange={(e) => {
            localStorage.setItem(`${type}Language`, e.target.value);
            setLanguage(e.target.value);
          }}
          optionsArray={AvailableWordsLanguages}
        />
      }
    />
  );
};

export default PreparePage;
