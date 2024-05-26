import { useDispatch } from "react-redux";
import { setCurrentMatch } from "../../store/resultSlice";
import Link from "next/link";

import classes from "./OneMatch.module.css";

const OneMatch = ({ match }) => {
  const dispatch = useDispatch();

  return (
    <Link
      className={classes["one-match"]}
      href={`view-match/${match.disciplineId}`}
      onClick={() => dispatch(setCurrentMatch(match))}
    >
      <p>
        {match.competition.competitionName} {match.competition.season}
      </p>
      <span>
        {match.competitor.name} Plays {match.discipline}.
      </span>
    </Link>
  );
};

export default OneMatch;
