import UserResultItem from "./UserResultItem";

import classes from "./UsersResultsList.module.css";

export default function UsersResultsList({ courseResults, course }) {
  return (
    <div className={classes.cards}>
      {courseResults.map((result, i) => (
        <UserResultItem key={i} result={result} course={course} />
      ))}
    </div>
  );
}
