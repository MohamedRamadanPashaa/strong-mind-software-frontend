import { memo, useCallback, useEffect, useState } from "react";
import classes from "./TopThree.module.css";
import TopThreeIndividuals from "./TopThreeIndividuals";

const TopThree = ({ disciplinesSorted, title }) => {
  const [topOverall, setTopOverall] = useState([]);
  const [topKids, setTopKids] = useState([]);
  const [topJuniors, setTopJuniors] = useState([]);
  const [topAdults, setTopAdults] = useState([]);
  const [topSeniors, setTopSeniors] = useState([]);

  const getCategoryArray = useCallback(
    (category) => {
      let newArr = [];

      if (title === "Overall") {
        newArr = disciplinesSorted
          .filter((el) => el[el.length - 1].category === category)
          .slice(0, 3);

        return newArr;
      } else {
        newArr = disciplinesSorted
          .filter((el) => el[0].category === category)
          .slice(0, 3);
        return newArr;
      }
    },
    [title, disciplinesSorted]
  );

  useEffect(() => {
    setTopKids(getCategoryArray("Kids"));
  }, [getCategoryArray]);

  useEffect(() => {
    setTopJuniors(getCategoryArray("Juniors"));
  }, [getCategoryArray]);

  useEffect(() => {
    setTopAdults(getCategoryArray("Adults"));
  }, [getCategoryArray]);

  useEffect(() => {
    setTopSeniors(getCategoryArray("Seniors"));
  }, [getCategoryArray]);

  useEffect(() => {
    setTopOverall(disciplinesSorted.slice(0, 3));
  }, [disciplinesSorted]);

  return (
    <div className={classes["top-three"]}>
      {topOverall.length > 0 && (
        <TopThreeIndividuals topThree={topOverall} title={"Overall"} />
      )}

      {topSeniors.length > 0 && (
        <TopThreeIndividuals topThree={topSeniors} title={"Seniors"} />
      )}

      {topAdults.length > 0 && (
        <TopThreeIndividuals topThree={topAdults} title={"Adults"} />
      )}

      {topJuniors.length > 0 && (
        <TopThreeIndividuals topThree={topJuniors} title={"Juniors"} />
      )}

      {topKids.length > 0 && (
        <TopThreeIndividuals topThree={topKids} title={"Kids"} />
      )}
    </div>
  );
};

export default memo(TopThree);
