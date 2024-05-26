import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  ranCardsArrayInOnePage,
  recCardsArrayInOnePage,
  arrangedDeck,
  cursorPosition,
  view,
  running,
}) => {
  return (
    <div className={classes["result-sheet"]}>
      <div className={classes["recalled-cards"]}>
        {recCardsArrayInOnePage.map((card, index) => {
          return (
            <div
              key={index}
              className={`${classes.card} ${
                card !== "" && card === ranCardsArrayInOnePage[index]
                  ? classes.right
                  : card === ""
                  ? classes.empty
                  : classes.wrong
              } ${
                view && running && cursorPosition === index
                  ? classes.focus
                  : undefined
              }`}
            >
              <span
                className={`${classes["right-card"]} ${
                  ranCardsArrayInOnePage[index].includes("♥") ||
                  ranCardsArrayInOnePage[index].includes("♦")
                    ? classes.red
                    : undefined
                }`}
              >
                {ranCardsArrayInOnePage[index].split(".")[0]}
              </span>
              <div className={classes.img}>
                {card !== "" && (
                  <img src={`/img/cards/${card}`} alt={`${card}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes["arranged-deck"]}>
        {arrangedDeck.map((card) => {
          return (
            <div
              style={{
                visibility: recCardsArrayInOnePage.includes(card)
                  ? "hidden"
                  : "visible",
              }}
              className={classes.card}
              key={card}
            >
              {!recCardsArrayInOnePage.includes(card) && (
                <img src={`/img/cards/${card}`} alt={`${card}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultSheet;
