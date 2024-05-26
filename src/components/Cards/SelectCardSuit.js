import { cardSuits } from "../../PaginationData/CardsSuits";
import classes from "./SelectCardSuit.module.css";

const SelectCardSuit = ({ onChange, value }) => {
  return (
    <div className={classes["card-suits"]}>
      <label>The Order of Recall Deck</label>
      <select onChange={onChange} value={value}>
        {cardSuits.map((el, indx) => (
          <option key={indx} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCardSuit;
