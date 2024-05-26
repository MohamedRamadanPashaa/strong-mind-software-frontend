import { AvailableNamesLanguages } from "../../Data/Languages";
import PrepareCard from "../ShareDiscipline/PrepareCard";
import SelectElement from "../UIElements/SelectElement";
import NamesInstructions from "./NamesInstructions";

const PreparePage = ({
  title,
  countSeconds,
  setCountSeconds,
  memoTime,
  setMemoTime,
  recallTime,
  setRecallTime,
  isValid,
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
  loadedAmount,
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
      loadedAmount={loadedAmount}
      amount={amount}
      memoTime={memoTime}
      language={language}
      recallTime={recallTime}
      custom={custom}
      countSeconds={countSeconds}
      setCountSeconds={setCountSeconds}
      type={type}
      setAmount={setAmount}
      setMemoTime={setMemoTime}
      setRecallTime={setRecallTime}
      resetDataHandler={resetDataHandler}
      instructionsDiscipline={<NamesInstructions />}
      selectLanguage={
        <SelectElement
          value={language}
          label={"Language"}
          onChange={(e) => {
            localStorage.setItem(`${type}Language`, e.target.value);
            setLanguage(e.target.value);
          }}
          optionsArray={AvailableNamesLanguages}
        />
      }
    />
  );
};

export default PreparePage;
