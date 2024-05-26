import { useEffect } from "react";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useSelector } from "react-redux";

import classes from "./MainTable.module.css";
import TableBody from "./TableBody";

let objectOne = [];
let objectTwo = [];
let action = [];

const MainTable = ({ title }) => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const { totalNumOfQuestion } = useSelector((state) => state.result);

  useEffect(() => {
    const request = async () => {
      try {
        const data = await sendRequest(`/api/v1/results/rank/${title}`);

        let res = data.data;

        // add mistakes if not found
        res = res.map((el) =>
          !el.mistakes && el.mistakes !== 0
            ? { ...el, mistakes: totalNumOfQuestion - el.score }
            : el
        );

        res.sort(function (a, b) {
          if (a.score !== b.score) {
            return b.score - a.score;
          }

          if (a.time === b.time) {
            return a.mistakes - b.mistakes;
          }

          return a.time - b.time;
        });

        if (title === "Object One") {
          objectOne = res;
        } else if (title === "Object Two") {
          objectTwo = res;
        } else if (title === "Action") {
          action = res;
        }
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, [sendRequest, title, totalNumOfQuestion]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      {(objectOne.length !== 0 ||
        objectTwo.length !== 0 ||
        action.length !== 0) && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Score</th>
              <th>Mistakes</th>
              <th>Time (sec)</th>
              <th>Attempts</th>
            </tr>
          </thead>
          {title === "Object One" && <TableBody results={objectOne} />}
          {title === "Object Two" && <TableBody results={objectTwo} />}
          {title === "Action" && <TableBody results={action} />}
        </table>
      )}
    </>
  );
};

export default MainTable;
