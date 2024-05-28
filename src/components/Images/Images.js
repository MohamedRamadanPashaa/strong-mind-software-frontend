import { useCallback, useEffect, useState } from "react";
import useChangePage from "../../hooks/change-page-hook";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import PreparePage from "./PreparePage";
import CountDown from "../TrainStartElements/CountDown";
import MemoImages from "./MemoImages";
import RecallImages from "./RecallImages";
import { divideArrWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import { shuffleSmallArraysInsideBigArray } from "../../helpers/shuffleArray";
import ShowResults from "./ShowResults";
import SummitResult from "../ShareDiscipline/SummitResult";
import { getScoreAndCorrectImages } from "../../helpers/calculateScoreCorrect";

// const pngImg = 5894;
// const jpgImg = 466;

const pngImg = 848;
const jpgImg = 5170;

const Images = ({
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
  const [randomImagesArray, setRandomImagesArray] = useState([]);
  const [showRecalledImagesArray, setShowRecalledImagesArray] = useState([]);
  const [imagesRecalledArray, setImagesRecalledArray] = useState([]);
  const [skipFinalImage, setSkipFinalImage] = useState(false);
  const [loadedAmount, setLoadedAmount] = useState(0);
  const [preloadData, setPreloadData] = useState(false);

  useEffect(() => {
    setSkipFinalImage(
      JSON.parse(localStorage.getItem("skipFinalImage")) === false
        ? false
        : true
    );
  }, []);

  // generate amount of random images
  const generateRandomImages = async () => {
    const pngAmount = Math.floor((pngImg / (pngImg + jpgImg)) * amount);
    const jpgAmount = Math.ceil((jpgImg / (pngImg + jpgImg)) * amount);

    const pngArr = generateRandomArr(pngAmount, "png", pngImg);
    const jpgArr = generateRandomArr(jpgAmount, "jpg", jpgImg);
    // const pngArr = generateRandomArr(5, "png", 5);
    // const jpgArr = generateRandomArr(5, "jpg", 5);

    const imgArray = mergeAndMixTwoArrays(pngArr, jpgArr);
    const dividedImgArray = divideArrWithEqualLength(imgArray, numberBerRow);
    const shuffledDividedArray =
      shuffleSmallArraysInsideBigArray(dividedImgArray);
    setShowRecalledImagesArray(shuffledDividedArray);

    await preloadImageHandler(imgArray);

    return imgArray;
  };

  // generate array of image with name and extension
  const generateRandomArr = (amount, ext, total) => {
    let randomArr = [];
    let totalAmountArr = [];

    for (let i = 0; i < total; i++) {
      totalAmountArr.push(i + 1);
    }

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * totalAmountArr.length);
      const randomNumber = totalAmountArr.splice(randomIndex, 1);
      randomArr.push(`1 (${randomNumber}).${ext}`);
    }

    return randomArr;
  };

  // randomize and merge two type of ext of images
  const mergeAndMixTwoArrays = (arr1, arr2) => {
    let arr = [...arr1, ...arr2];
    let newArr = [];
    let amount = arr1.length + arr2.length;
    let imgIndx = 1;

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (i % 5 === 0) {
        imgIndx = 1;
      }
      const randomNumber = {
        src: arr.splice(randomIndex, 1)[0],
        rightAnswer: imgIndx++,
      };
      newArr.push(randomNumber);
    }

    setRandomImagesArray(newArr);
    return newArr;
  };

  const preloadImageHandler = async (imgArr) => {
    let loadedArr = [];
    // setPreloadData(true);

    const promises = await imgArr.map((image, i) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
          resolve(`/img/IAM_Images_Database/${image.src}`);
          console.log(img);
          loadedArr.push(i);
          setLoadedAmount(loadedArr.length / amount);

          if (loadedArr.length / amount === 1) {
            console.log("done");
            // setPreloadData(false);
          }
        };

        img.onerror = () => reject();
        img.src = `/img/IAM_Images_Database/${image.src}`;
      });
    });

    await Promise.all(promises);
  };

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledImagesEmptyArray = [];

    for (let i = 0; i < amount; i++) {
      recalledImagesEmptyArray.push("");
    }

    setImagesRecalledArray(recalledImagesEmptyArray);
    return recalledImagesEmptyArray;
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
    setGrouping,
    setGroupingArray,
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
    memoData: randomImagesArray,
    showData: showRecalledImagesArray,
    recallData: imagesRecalledArray,
    skipFinal: skipFinalImage,
  });

  const preloadDataHandler = async () => {
    await generateRandomImages();
    generateRecallElement();
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomImagesArray([]);
    setImagesRecalledArray([]);
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
            grouping={grouping}
            setGrouping={setGrouping}
            groupingArray={groupingArray}
            setGroupingArray={setGroupingArray}
            isValid={isValid}
            numberBerRow={numberBerRow}
            startCountDownHandler={startCountDownHandler}
            preloadDataHandler={preloadDataHandler}
            resetDataHandler={resetDataHandler}
            custom={custom}
            standard={standard}
            isLoading={isLoading}
            preloadData={preloadData}
            type={type}
            skipFinalImage={skipFinalImage}
            setSkipFinalImage={setSkipFinalImage}
            loadedAmount={loadedAmount}
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
          <MemoImages
            memoTime={memoTime}
            title={title}
            randomImagesArray={randomImagesArray}
            amount={amount}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            sum={grouping * 1}
            numberOfPage={numberOfPage}
            startRecallHandler={startRecallCountdownHandler}
            memo={true}
            standard={standard}
            custom={custom}
            skipFinalImage={skipFinalImage}
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
          <RecallImages
            recallTime={recallTime}
            title={title}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            amount={amount}
            sum={1}
            imagesRecalledArray={imagesRecalledArray}
            showRecalledImagesArray={showRecalledImagesArray}
            setImagesRecalledArray={setImagesRecalledArray}
            numberOfPage={numberOfPage}
            showResultHandler={startSummitResultHandler}
            custom={custom}
          />
        )}

        {summitResult && (
          <SummitResult
            calculatePoints={calculatePoints}
            custom={custom}
            recalledArray={imagesRecalledArray}
            randomArray={showRecalledImagesArray}
            getScoreAndCorrect={getScoreAndCorrectImages}
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
          />
        )}

        {result && (
          <ShowResults
            imagesRecalledArray={imagesRecalledArray}
            showRecalledImagesArray={showRecalledImagesArray}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={amount}
            title={title}
            playAgainHandler={playAgainHandler}
            calculatePoints={calculatePoints}
            custom={custom}
            standard={standard}
          />
        )}
      </DisciplineCard>
    </>
  );
};

export default Images;
