import { useEffect, useState } from "react";
import { socket } from "../../helpers/socket";
import ViewResultCardStats from "./ViewResultCardStats";

const ViewResultCard = ({
  match,
  result,
  getScoreCorrect,
  calculatePoints,
  disciplineId,
}) => {
  const [recalledArray, setRecalledArray] = useState(match.recallData);
  const [randomArray, setRandomArray] = useState(match.showData);
  const [memoTime, setMemoTime] = useState(match.memorizationTimeTaken);
  const [recallTime, setRecallTime] = useState(match.recallTimeTaken);

  useEffect(() => {
    socket.on("send-match-actions", (data) => {
      if (disciplineId === data.disciplineId) {
        setRecalledArray(data.recallData);
        setRandomArray(data.showData);
        setMemoTime(data.memorizationTimeTaken);
        setRecallTime(data.recallTimeTaken);
      }
    });
  }, [disciplineId, getScoreCorrect]);

  // calculate score and correct

  const { score, correct } = getScoreCorrect(
    randomArray,
    recalledArray,
    match.amount,
    match.numberBerRow,
    match.cardsFromLeftToRight
  );

  return (
    <ViewResultCardStats
      match={match}
      score={score}
      correct={correct}
      result={result}
      memoTime={memoTime}
      recallTime={recallTime}
      calculatePoints={calculatePoints}
    />
  );
};

export default ViewResultCard;
