import {
  FaBackwardFast,
  FaSquareCaretLeft,
  FaSquareCaretRight,
  FaSquareXmark,
} from "react-icons/fa6";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

import classes from "./Arrows.module.css";

const Arrows = ({
  forwardToNextPosition,
  backToLastPosition,
  backToFirst,
  memo,
  shiftForward,
  shiftBackward,
  deleteCurrentNumber,
  shifting,
}) => {
  return (
    <div className={classes.show}>
      <div className={classes.arrows}>
        <span onClick={backToFirst}>
          <FaBackwardFast />
        </span>
        <span onClick={backToLastPosition}>
          <FaSquareCaretLeft />
        </span>
        <span onClick={forwardToNextPosition}>
          <FaSquareCaretRight />
        </span>

        {!memo && (
          <>
            {shifting && (
              <>
                <span onClick={shiftForward}>
                  <FaPlusSquare />
                </span>

                <span onClick={shiftBackward}>
                  <FaMinusSquare />
                </span>
              </>
            )}

            <span onClick={deleteCurrentNumber}>
              <FaSquareXmark />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Arrows;
