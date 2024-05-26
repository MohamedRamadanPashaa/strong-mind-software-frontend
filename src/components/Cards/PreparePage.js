import PrepareCard from "../ShareDiscipline/PrepareCard";
import SelectElement from "../UIElements/SelectElement";
import CardsInstructions from "./CardsInstructions";
import SpeedCardsInstructions from "./SpeedCardsInstructions";
import PreviewCards from "./PreviewCards";
import CheckboxInput from "../ShareDiscipline/CheckboxInput";
import SelectCardSuit from "./SelectCardSuit";

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
  gapBetweenCards,
  setGapBetweenCards,
  cardsSuits,
  setCardsSuits,
  cardsFromLeftToRight,
  setCardsFromLeftToRight,
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
        type === "cards" ? (
          <CardsInstructions numberBerRow={numberBerRow} />
        ) : (
          <SpeedCardsInstructions numberBerRow={numberBerRow} />
        )
      }
      preview={
        groupingArray && (
          <PreviewCards grouping={grouping} gapBetweenCards={gapBetweenCards} />
        )
      }
      groupingInput={
        <SelectElement
          length={6}
          value={grouping}
          label={"Grouping (1-6)"}
          onChange={(e) => {
            localStorage.setItem(`${type}Grouping`, e.target.value);
            setGrouping(e.target.value);
          }}
        />
      }
      checkBoxInput={
        <>
          <CheckboxInput
            label={"Gap Between Cards"}
            onChangeHandler={() => {
              setGapBetweenCards((prev) => !prev);
              localStorage.setItem("gapBetweenCards", !gapBetweenCards);
            }}
            checked={gapBetweenCards}
            id={"gap"}
          />

          <CheckboxInput
            label={"Cards From Left To Right"}
            onChangeHandler={() => {
              setCardsFromLeftToRight((prev) => !prev);
              localStorage.setItem(
                "cardsFromLeftToRight",
                !cardsFromLeftToRight
              );
            }}
            checked={cardsFromLeftToRight}
            id={"cardDirection"}
          />
        </>
      }
      selectCardsSuits={
        <SelectCardSuit
          value={cardsSuits}
          onChange={(e) => {
            localStorage.setItem("cardsSuits", e.target.value);
            setCardsSuits(e.target.value);
          }}
        />
      }
    />
  );
};

export default PreparePage;
