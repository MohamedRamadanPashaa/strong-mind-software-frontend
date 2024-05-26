import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useMyCompetitions from "../../hooks/my-competitions-hook";
import Button from "../FormElement/Button";
import ContentEnter from "../UIElements/ContentEnter";
import CountSecondsInput from "./CountSecondsInput";
import CustomSettings from "./CustomSettings";
import Instructions from "./Instructions";
import SelectCompetition from "./SelectCompetition";
import SettingsCard from "./SettingsCard";

import classes from "./PrepareCard.module.css";

const PrepareCard = ({
  standard,
  title,
  preloadData,
  isValid,
  startCountDownHandler,
  preloadDataHandler,
  isLoading,
  loadedAmount,
  amount,
  memoTime,
  recallTime,
  instructionsDiscipline,
  preview,
  groupingInput,
  checkBoxInput,
  custom,
  countSeconds,
  setCountSeconds,
  type,
  setAmount,
  setMemoTime,
  setRecallTime,
  resetDataHandler,
  selectCardsSuits,
  SelectAttempt,
  selectLanguage,
  language,
  selectSpokenInterval,
}) => {
  const { myCompetitions } = useSelector((state) => state.result);
  const { standardLoading } = useMyCompetitions(standard);

  // reset all memo and recall data if amount changes
  useEffect(() => {
    resetDataHandler();
  }, [resetDataHandler, amount, language]);

  const nodeRef = useRef(null);

  return (
    <ContentEnter show={!standardLoading} nodeRef={nodeRef}>
      <div className={classes["prepare-page"]} ref={nodeRef}>
        <h2>{title}</h2>

        <Instructions
          memoTime={title.includes("Spoken") ? amount + "s" : memoTime}
          recallTime={recallTime}
        >
          {instructionsDiscipline}
        </Instructions>

        {preview && preview}

        <SettingsCard>
          {groupingInput}

          {selectLanguage && selectLanguage}

          {checkBoxInput && checkBoxInput}

          {selectCardsSuits && selectCardsSuits}

          {type === "spoken" && !custom && SelectAttempt && SelectAttempt}

          {type === "spoken" &&
            custom &&
            selectSpokenInterval &&
            selectSpokenInterval}

          <CountSecondsInput
            countSeconds={countSeconds}
            setCountSeconds={setCountSeconds}
          />

          {custom && (
            <CustomSettings
              amount={amount}
              type={type}
              setAmount={setAmount}
              memoTime={memoTime}
              setMemoTime={setMemoTime}
              recallTime={recallTime}
              setRecallTime={setRecallTime}
            />
          )}

          {!custom && myCompetitions && myCompetitions.length > 0 && (
            <SelectCompetition options={myCompetitions} />
          )}
        </SettingsCard>

        <div className={classes.btn}>
          <Button
            disabled={
              isValid || preloadData || (loadedAmount <= 1 && loadedAmount > 0)
            }
            onClick={preloadDataHandler}
            className={classes.preload}
          >
            {loadedAmount && loadedAmount < 1
              ? `Preload Data (${Math.round(loadedAmount * 100)}%)`
              : "Preload Data"}
          </Button>

          <Button
            outline={true}
            disabled={
              isValid ||
              isLoading ||
              !preloadData ||
              (loadedAmount && loadedAmount < 1)
            }
            onClick={startCountDownHandler}
          >
            {isLoading ? "Wait..." : "Start"}
          </Button>
        </div>
      </div>
    </ContentEnter>
  );
};

export default PrepareCard;
