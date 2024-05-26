import { useCallback, useEffect, useState } from "react";
import useChangePage from "../../hooks/change-page-hook";
import { shuffleArray } from "../../helpers/shuffleArray";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import PreparePage from "./PreparePage";
import CountDown from "../TrainStartElements/CountDown";
import MemoNames from "./MemoNames";
import SummitResult from "../ShareDiscipline/SummitResult";
import { getScoreAndCorrectNames } from "../../helpers/calculateScoreCorrect";
import RecallNames from "./RecallNames";
import ShowResults from "./ShowResults";

const femaleJpeg = 303;
const femaleJfIf = 339;
const maleJpeg = 266;
const maleJfIf = 295;

const Names = ({
  memoTime: memorizationTime,
  recallTime: recallT,
  title,
  amount: amountOfData,
  numberBerRow,
  rowInPage,
  calculatePoints,
  custom,
  standard,
  type,
  defaultGrouping,
}) => {
  const [randomNamesArray, setRandomNamesArray] = useState([]);
  const [showRecalledNamesArray, setShowRecalledNamesArray] = useState([]);
  const [namesRecalledArray, setNamesRecalledArray] = useState([]);
  const [loadedAmount, setLoadedAmount] = useState(0);
  const [preloadData, setPreloadData] = useState(false);
  const [language, setLanguage] = useState("arabic");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(localStorage.getItem(`wordsLanguage`) || "arabic");
    }
  }, []);

  // generate amount of random images
  const generateRandomNames = async () => {
    const maleAmount = Math.ceil(amount / 2);
    const femaleAmount = Math.floor(amount / 2);

    // generate names
    const maleName = await getNamesEachCategory("male", maleAmount);
    const femaleName = await getNamesEachCategory("female", femaleAmount);
    const lastName = await getNamesEachCategory("last", amount);

    // generate faces
    const maleFaces = mergeAndMixTwoArrays(
      generateRandomFacesArr(
        Math.floor(maleAmount / 2),
        "jpeg",
        maleJpeg,
        "male"
      ),
      generateRandomFacesArr(
        Math.ceil(maleAmount / 2),
        "jfif",
        maleJfIf,
        "male"
      )
    );
    const femaleFaces = mergeAndMixTwoArrays(
      generateRandomFacesArr(
        Math.floor(femaleAmount / 2),
        "jpeg",
        femaleJpeg,
        "female"
      ),
      generateRandomFacesArr(
        Math.ceil(femaleAmount / 2),
        "jfif",
        femaleJfIf,
        "female"
      )
    );

    // merge both faces and names
    const namesFaces = mergeNamesAndFaces(
      maleName,
      maleFaces,
      femaleName,
      femaleFaces,
      lastName
    );

    const namesFacesRandom = shuffleArray(namesFaces);
    const namesFacesShow = shuffleArray(namesFacesRandom);

    setRandomNamesArray(namesFacesRandom);
    setShowRecalledNamesArray(namesFacesShow);
    await preloadImageHandler(namesFacesRandom);

    return namesFacesShow;
  };

  const getNamesEachCategory = async (type, nameAmount) => {
    const name = await fetch(`/names/${language}/${type}.txt`);
    const nameText = await name.text();
    const allNamesArray = nameText.split(/\r?\n/);

    if (nameAmount <= 0 || nameAmount > amount) {
      throw new Error("Percentage should be between 1 and 100.");
    }

    const randomIndices = [];
    while (randomIndices.length < nameAmount) {
      const randomIndex = Math.floor(Math.random() * allNamesArray.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const randomNames = [];
    for (let i = 0; i < randomIndices.length; i++) {
      randomNames.push(allNamesArray[randomIndices[i]]);
    }

    return randomNames;
  };

  // generate array of image with name and extension
  const generateRandomFacesArr = (amount, ext, total, type) => {
    let randomArr = [];
    let totalAmountArr = [];

    for (let i = 0; i < total; i++) {
      totalAmountArr.push(i + 1);
    }

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * totalAmountArr.length);
      const randomNumber = totalAmountArr.splice(randomIndex, 1);
      randomArr.push(`${type} (${randomNumber}).${ext}`);
    }

    return randomArr;
  };

  // randomize and merge two type of ext of images
  const mergeAndMixTwoArrays = (arr1, arr2) => {
    let arr = [...arr1, ...arr2];
    let newArr = [];
    let amount = arr1.length + arr2.length;

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const randomNumber = arr.splice(randomIndex, 1)[0];
      newArr.push(randomNumber);
    }

    setRandomNamesArray(newArr);
    return newArr;
  };

  // merge both faces and names
  const mergeNamesAndFaces = (
    maleName,
    maleFaces,
    femaleName,
    femaleFaces,
    lastName
  ) => {
    let newArr = [];
    let maleN = [...maleName];
    let maleF = [...maleFaces];
    let femaleN = [...femaleName];
    let femaleF = [...femaleFaces];
    let lastN = [...lastName];

    for (let i = 0; i < maleName.length; i++) {
      const ranIndexOne = Math.floor(Math.random() * maleN.length);
      const ranIndexTwo = Math.floor(Math.random() * lastN.length);

      const male = {
        firstName: maleN.splice(ranIndexOne, 1)[0],
        lastName: lastN.splice(ranIndexTwo, 1)[0],
        face: maleF.splice(ranIndexOne, 1)[0],
      };
      newArr.push(male);
    }

    for (let i = 0; i < femaleName.length; i++) {
      const ranIndexThree = Math.floor(Math.random() * femaleN.length);
      const ranIndexFour = Math.floor(Math.random() * lastN.length);

      const female = {
        firstName: femaleN.splice(ranIndexThree, 1)[0],
        lastName: lastN.splice(ranIndexFour, 1)[0],
        face: femaleF.splice(ranIndexThree, 1)[0],
      };
      newArr.push(female);
    }

    return newArr;
  };

  const preloadImageHandler = async (facesArr) => {
    let loadedArr = [];
    // setPreloadData(true);

    const promises = await facesArr.map((name, i) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
          resolve(
            `/img/faces/${name.face.startsWith("male") ? "m" : "f"}/${
              name.face
            }`
          );
          console.log(img);
          loadedArr.push(i);
          setLoadedAmount(loadedArr.length / amount);

          if (loadedArr.length / amount === 1) {
            console.log("done");
          }
        };

        img.onerror = () => reject();
        img.src = `/img/faces/${name.face.startsWith("male") ? "m" : "f"}/${
          name.face
        }`;
      });
    });

    await Promise.all(promises);
  };

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledNamesEmptyArray = [];

    for (let i = 0; i < amount * 2; i++) {
      recalledNamesEmptyArray.push("");
    }

    setNamesRecalledArray(recalledNamesEmptyArray);
    return recalledNamesEmptyArray;
  };

  const {
    prepare,
    countdown,
    memo,
    recallCountdown,
    recall,
    result,
    startMemoHandler,
    startRecallCountdownHandler,
    startRecallHandler,
    showResultHandler,
    playAgainHandler,
    isValid,
    setCountSeconds,
    setAmount,
    setMemoTime,
    setRecallTime,
    amount,
    groupingArray,
    memoTime,
    recallTime,
    countSeconds,
    grouping,
    numberOfPage,
    isLoading,
    startCountDownHandler,
    startSummitResultHandler,
    summitResult,
  } = useChangePage({
    amountOfData,
    defaultGrouping,
    memorizationTime,
    recallT,
    type,
    numberBerRow,
    rowInPage,
    title,
    standard,
    memoData: randomNamesArray,
    showData: showRecalledNamesArray,
    recallData: namesRecalledArray,
    language,
  });

  const preloadDataHandler = async () => {
    await generateRandomNames();
    generateRecallElement();
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomNamesArray([]);
    setNamesRecalledArray([]);
    setPreloadData(false);
    setLoadedAmount(0);
  }, []);
  return (
    <>
      {/* <Prompt isDirty={countdown || memo || recallCountdown || recall} /> */}

      <DisciplineCard>
        {prepare && (
          <PreparePage
            title={title}
            countSeconds={countSeconds}
            setCountSeconds={setCountSeconds}
            memoTime={memoTime}
            setMemoTime={setMemoTime}
            recallTime={recallTime}
            setRecallTime={setRecallTime}
            amount={amount}
            setAmount={setAmount}
            isValid={isValid}
            startCountDownHandler={startCountDownHandler}
            preloadDataHandler={preloadDataHandler}
            resetDataHandler={resetDataHandler}
            custom={custom}
            standard={standard}
            isLoading={isLoading}
            preloadData={preloadData}
            type={type}
            loadedAmount={loadedAmount}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {countdown && (
          <CountDown
            text={"Memorization Will Start In"}
            countSeconds={countSeconds}
            startMemoHandler={startMemoHandler}
            custom={custom}
          />
        )}

        {memo && (
          <MemoNames
            memoTime={memoTime}
            title={title}
            randomNamesArray={randomNamesArray}
            amount={amount}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            sum={grouping * 1}
            numberOfPage={numberOfPage}
            startRecallHandler={startRecallCountdownHandler}
            memo={true}
            standard={standard}
            custom={custom}
            language={language}
          />
        )}

        {recallCountdown && (
          <CountDown
            text={"Recall Will Start In"}
            countSeconds={10}
            startMemoHandler={startRecallHandler}
            custom={custom}
          />
        )}

        {recall && (
          <RecallNames
            recallTime={recallTime}
            groupingArray={groupingArray}
            title={title}
            numberBerRow={numberBerRow}
            showRecalledNamesArray={showRecalledNamesArray}
            rowInPage={rowInPage}
            amount={amount}
            sum={grouping * 1}
            namesRecalledArray={namesRecalledArray}
            setNamesRecalledArray={setNamesRecalledArray}
            numberOfPage={numberOfPage}
            showResultHandler={startSummitResultHandler}
            custom={custom}
            language={language}
          />
        )}

        {summitResult && (
          <SummitResult
            calculatePoints={calculatePoints}
            custom={custom}
            recalledArray={namesRecalledArray}
            randomArray={showRecalledNamesArray}
            getScoreAndCorrect={getScoreAndCorrectNames}
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
          />
        )}

        {result && (
          <ShowResults
            namesRecalledArray={namesRecalledArray}
            randomNamesArray={showRecalledNamesArray}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={amount}
            title={title}
            playAgainHandler={playAgainHandler}
            calculatePoints={calculatePoints}
            custom={custom}
            language={language}
          />
        )}
      </DisciplineCard>
    </>
  );
};

export default Names;
