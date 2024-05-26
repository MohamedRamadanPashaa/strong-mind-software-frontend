import PrepareCard from "../ShareDiscipline/PrepareCard";
import ImagesInstructions from "./ImagesInstructions";
import PreviewImages from "./PreviewImages";
import SelectElement from "../UIElements/SelectElement";
import SkipFinalImageInput from "./SkipFinalImageInput";

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
  skipFinalImage,
  setSkipFinalImage,
  loadedAmount,
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
      recallTime={recallTime}
      custom={custom}
      countSeconds={countSeconds}
      setCountSeconds={setCountSeconds}
      type={type}
      setAmount={setAmount}
      setMemoTime={setMemoTime}
      setRecallTime={setRecallTime}
      resetDataHandler={resetDataHandler}
      instructionsDiscipline={
        <ImagesInstructions numberBerRow={numberBerRow} />
      }
      preview={groupingArray && <PreviewImages grouping={grouping} />}
      groupingInput={
        <SelectElement
          length={skipFinalImage ? 4 : 5}
          value={grouping}
          label={`Grouping (1-${skipFinalImage ? 4 : 5})`}
          onChange={(e) => {
            localStorage.setItem(`${type}Grouping`, e.target.value);
            setGrouping(e.target.value);
          }}
        />
      }
      checkBoxInput={
        <SkipFinalImageInput
          skipFinalImage={skipFinalImage}
          setSkipFinalImage={setSkipFinalImage}
          grouping={grouping}
          setGrouping={setGrouping}
          type={type}
        />
      }
    />
  );
};

export default PreparePage;
