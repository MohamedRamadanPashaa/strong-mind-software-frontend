import Timer from "./Timer";

import classes from "./Header.module.css";

const Header = ({ rightAnswers, numOfQ, dispatch, title, wrongAnswers }) => {
  return (
    <div className={classes.testHead}>
      <div>
        Score: <span>{rightAnswers}</span>
      </div>

      <div>
        Mistakes: <span>{wrongAnswers}</span>
      </div>
      <Timer
        numOfQ={numOfQ}
        dispatch={dispatch}
        rightAnswers={rightAnswers}
        mistakes={wrongAnswers}
        title={title}
      />
    </div>
  );
};

export default Header;
