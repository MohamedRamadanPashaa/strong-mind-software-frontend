import Image from "next/image";
import classes from "./Question.module.css";

const Question = ({
  question,
  questions,
  checkAnswer,
  answers,
  title,
  wrongAnswer,
}) => {
  return (
    <div className={classes.question}>
      {title === "Object One" || title === "Object Two" ? (
        <div className={classes.img}>
          <img
            src={`/img/${title === "Object One" ? "O1" : "O2"}/${
              question < 10 ? `0${question}` : question
            }.jpg`}
            alt={question}
          />
        </div>
      ) : (
        <h3>{questions[question].word}</h3>
      )}
      <ul>
        {answers.map((answer) => (
          <li
            onClick={checkAnswer}
            key={answer}
            className={
              wrongAnswer && wrongAnswer.selectedAnswer === answer
                ? classes.mistake
                : undefined
            }
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
