import Pagination from "../ShareDiscipline/Pagination";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { calculatePointsObj } from "../../helpers/calculatePointsObj";
import TopThree from "./TopThree";
import { FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loading from "../UIElements/Loading";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import classes from "./Ranking.module.css";

const rowInPage = 5;

const RankingTable = ({ disciplines, title, competition }) => {
  const { data, status } = useSession();
  const user = data?.user;
  const [page, setPage] = useState(1);

  const findScore = (arr, discipline = title) => {
    const obj = arr.find((el) => el.discipline === discipline);
    return obj && obj.score ? obj.score : 0;
  };

  const findPoints = (arr, discipline = title) => {
    const obj = arr.find((el) => el.discipline === discipline);
    return obj && obj.points ? obj.points : 0;
  };

  const findTime = (arr, discipline = title) => {
    const obj = arr.find((el) => el.discipline === discipline);
    return obj && obj.memoTime ? obj.memoTime : 0;
  };

  const findId = (arr, discipline = title) => {
    const obj = arr.find((el) => el.discipline === discipline);
    return obj && obj.id;
  };

  // sort table based on its title
  const [disciplinesSorted, setDisciplineSorted] = useState(disciplines);

  useEffect(() => {
    if (title !== "Overall") {
      let arrNew = [];
      for (let i = 0; i < disciplines.length; i++) {
        const arr = disciplines[i].filter((d) => d.discipline === title);
        arr.length > 0 &&
          arrNew.push([
            {
              ...arr[0],
              category: disciplines[i][disciplines[i].length - 1].category,
            },
          ]);
      }

      // sort discipline
      arrNew = arrNew.sort((a, b) => {
        const el1 = a.find((el) => el.discipline === title);
        const el2 = b.find((el) => el.discipline === title);

        if (el2.score - el1.score !== 0) {
          return el2 && el1 && el2.score - el1.score;
        }

        return el1.memoTime - el2.memoTime;
      });

      // set rank for each discipline
      if (arrNew.length > 0) {
        let rank = 1;
        arrNew[0][0].rank = rank;
        for (let i = 1; i < arrNew.length; i++) {
          const scoreOne = arrNew[i - 1][0].score || 0;
          const scoreTwo = arrNew[i][0].score || 0;
          const timeOne =
            title === "Speed Cards" ? arrNew[i - 1][0].memoTime : 0;
          const timeTwo = title === "Speed Cards" ? arrNew[i][0].memoTime : 0;

          if (scoreOne === scoreTwo && timeOne === timeTwo) {
            arrNew[i][0].rank = rank;
          } else {
            rank = i + 1;
            arrNew[i][0].rank = rank;
          }
        }
      }

      setDisciplineSorted(arrNew);
    } else {
      let arrNew = [];
      if (competition) {
        arrNew = disciplines.sort(
          (a, b) => b[b.length - 1].overall - a[a.length - 1].overall
        );

        // set rank for overall
        if (arrNew.length > 0) {
          let rank = 1;
          arrNew[0][arrNew[0].length - 1].rank = rank;
          for (let i = 1; i < arrNew.length; i++) {
            const valueOne =
              arrNew[i - 1][arrNew[i - 1].length - 1].overall || 0;
            const valueTwo = arrNew[i][arrNew[i].length - 1].overall || 0;

            if (valueOne === valueTwo) {
              arrNew[i][arrNew[i].length - 1].rank = rank;
            } else {
              rank = i + 1;
              arrNew[i][arrNew[i].length - 1].rank = rank;
            }
          }
        }
      } else {
        arrNew = disciplines.sort(
          (a, b) => b[b.length - 1].newOverall - a[a.length - 1].newOverall
        );

        // set rank for new overall
        if (arrNew.length > 0) {
          let rank = 1;
          arrNew[0][arrNew[0].length - 1].rank = rank;
          for (let i = 1; i < arrNew.length; i++) {
            const valueOne =
              arrNew[i - 1][arrNew[i - 1].length - 1].newOverall || 0;
            const valueTwo = arrNew[i][arrNew[i].length - 1].newOverall || 0;

            if (valueOne === valueTwo) {
              arrNew[i][arrNew[i].length - 1].rank = rank;
            } else {
              rank = i + 1;
              arrNew[i][arrNew[i].length - 1].rank = rank;
            }
          }
        }
      }

      setDisciplineSorted(arrNew);
    }

    setPage(1);
  }, [disciplines, title, competition]);

  const [onePageCompetitor, setOnePageCompetitor] = useState(
    disciplinesSorted.filter(
      (res, indx) => indx >= (page - 1) * rowInPage && indx < page * rowInPage
    )
  );

  useEffect(() => {
    setOnePageCompetitor(
      disciplinesSorted.filter(
        (res, indx) => indx >= (page - 1) * rowInPage && indx < page * rowInPage
      )
    );
  }, [page, disciplinesSorted]);

  const pressPageNavigationHandler = (p) => {
    setPage(p);
  };

  const [numberOfPage, setNumberOfPage] = useState(
    Math.ceil(disciplinesSorted.length / rowInPage)
  );

  useEffect(() => {
    setNumberOfPage(Math.ceil(disciplinesSorted.length / rowInPage));
  }, [disciplinesSorted.length]);

  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (status === "loading") return <Loading center />;

  return (
    <>
      <Pagination
        numberOfPage={numberOfPage}
        page={page}
        pressPageNavigationHandler={pressPageNavigationHandler}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <div className={classes["ranking-table"]}>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Name</th>
              <th rowSpan={2}>Category</th>
              {title === "Overall" && (
                <>
                  <th rowSpan={2}>Overall</th>
                  <th rowSpan={2}>
                    Overall{" "}
                    <FaExclamationCircle title="Calculated with New Standard!" />
                  </th>
                </>
              )}

              {title !== "Overall" && (
                <>
                  <th colSpan={title === "Speed Cards" ? 4 : 3}>{title}</th>
                  <th rowSpan={2}>View</th>
                </>
              )}
            </tr>

            {title !== "Overall" && (
              <tr>
                <th>Score</th>
                {title === "Speed Cards" && <th>Time</th>}
                <th>Points</th>
                <th>
                  Points{" "}
                  <FaExclamationCircle title="Calculated with New Standard!" />
                </th>
              </tr>
            )}
          </thead>

          <tbody>
            {onePageCompetitor.map((arr, i) => {
              const { name, _id, photo } = arr[0].competitor;
              const { rank: rankOverall } = arr[arr.length - 1];
              const { rank: rankDiscipline } = arr[0];

              let category = "";
              if (title === "Overall") {
                category = arr[arr.length - 1].category;
              } else {
                category = arr[0].category;
              }

              return (
                <tr
                  key={i}
                  className={
                    user && _id && user.id === _id ? classes.me : undefined
                  }
                >
                  <td>{title === "Overall" ? rankOverall : rankDiscipline}</td>

                  <td className={classes.name}>
                    <div className={classes.img}>
                      <Image
                        src={
                          photo?.secure_url
                            ? photo.secure_url
                            : `/img/usersImages/default.jpg`
                        }
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <span title={name}>{name}</span>
                  </td>

                  <td>{category}</td>

                  {title === "Overall" && (
                    <>
                      <td className={classes.overall}>
                        {Math.round(arr[arr.length - 1].overall * 100) / 100 ||
                          0}
                      </td>
                      <td className={classes.overall}>
                        {Math.round(arr[arr.length - 1].newOverall * 100) /
                          100 || 0}
                      </td>
                    </>
                  )}

                  {title !== "Overall" && (
                    <>
                      <td>{findScore(arr, title)}</td>
                      {title === "Speed Cards" && (
                        <td>{findTime(arr, title)}</td>
                      )}
                      <td>{findPoints(arr, title)}</td>
                      <td>
                        {calculatePointsObj[title](
                          findScore(arr, title),
                          findTime(arr, title)
                        )}
                      </td>
                      <td>
                        <Link
                          href={`/view-match/${findId(arr, title)}`}
                          className={classes["view-more"]}
                        >
                          View <FaArrowUpRightFromSquare />
                        </Link>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <TopThree disciplinesSorted={disciplinesSorted} title={title} />
      </div>
    </>
  );
};

export default memo(RankingTable);
