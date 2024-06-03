"use client";

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
import { calculateCategory } from "@/helpers/calculateCategory";
import useHttp from "@/hooks/http-hook";

import classes from "./Ranking.module.css";

const rowInPage = 10;
let numberOfPage = 0;
let rank;

const RankingTable = ({ title, competition, standard }) => {
  const { data, status } = useSession();
  const user = data?.user;
  const [page, setPage] = useState(1);
  const { isLoading, sendRequest } = useHttp();
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const getDisciplineData = async () => {
      try {
        let url = "";
        if (title === "Overall") {
          url = `/api/v1/overalls/get-overall/${standard}?page=${page}`;
        } else {
          url = `/api/v1/disciplines/leader-board?standard=${standard}&page=${page}&discipline=${title}`;
        }

        const { data, count } = await sendRequest(url);

        setDisciplines(data.results);
        numberOfPage = Math.ceil(count / rowInPage);
      } catch (error) {
        console.log(error);
      }
    };

    getDisciplineData();
  }, [sendRequest, title, standard, page]);

  const pressPageNavigationHandler = (p) => {
    setPage(p);
  };

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

      <div className={classes.ranking}>
        {isLoading && <Loading className="loading-center" />}

        {!isLoading && (
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
                {disciplines.map((result, i) => {
                  const category = calculateCategory(
                    result.competitor.birthday,
                    result.createdAt
                  );
                  const { _id, photo, name } = result.competitor;
                  if (i > 0) {
                    if (title === "Overall") {
                      const overallOne = disciplines[i - 1].newOverall;
                      const overallTwo = disciplines[i].newOverall;

                      if (overallOne === overallTwo) {
                        console.log(rank);
                        rank = rank;
                      } else {
                        rank = (page - 1) * 10 + i + 1;
                      }
                    } else {
                      const scoreOne = disciplines[i - 1].score || 0;
                      const scoreTwo = disciplines[i].score || 0;
                      const timeOne =
                        title === "Speed Cards"
                          ? disciplines[i - 1].memoTime
                          : 0;
                      const timeTwo =
                        title === "Speed Cards" ? disciplines[i].memoTime : 0;

                      if (scoreOne === scoreTwo && timeOne === timeTwo) {
                        rank = rank;
                      } else {
                        rank = (page - 1) * 10 + i + 1;
                      }
                    }
                  } else {
                    rank = (page - 1) * 10 + i + 1;
                  }

                  return (
                    <tr
                      key={i}
                      className={user?.id === _id ? classes.me : undefined}
                    >
                      <td>{rank}</td>

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
                            {Math.round(result.overall * 100) / 100 || 0}
                          </td>
                          <td className={classes.overall}>
                            {Math.round(result.newOverall * 100) / 100 || 0}
                          </td>
                        </>
                      )}

                      {title !== "Overall" && (
                        <>
                          <td>{result.score}</td>
                          {title === "Speed Cards" && (
                            <td>{result.memoTime}</td>
                          )}
                          <td>{result.points}</td>
                          <td>
                            {calculatePointsObj[title](
                              result.score,
                              result.memoTime
                            )}
                          </td>
                          <td>
                            <Link
                              href={`/view-match/${result._id}`}
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
        )}
      </div>

      {/* <div>
        <TopThree disciplinesSorted={disciplinesSorted} title={title} />
      </div> */}
    </>
  );
};

export default memo(RankingTable);
