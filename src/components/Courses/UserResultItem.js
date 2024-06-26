import Image from "next/image";
import DisciplineResult from "./DisciplineResult";
import { calculateCategory } from "@/helpers/calculateCategory";

import classes from "./UserResultItem.module.css";

export default function UserResultItem({ result, course }) {
  console.log(result);

  return (
    <div className={classes.card}>
      <div className={classes["user-info"]}>
        <div className={classes.img}>
          <Image
            src={result.user.photo.secure_url || "/img/usersImages/default.jpg"}
            alt={result.user.name}
            width={200}
            height={200}
          />
        </div>

        <div>
          <h3>{result.user.name}</h3>
          <span>{calculateCategory(result.user.birthday, course.starts)}</span>
        </div>
      </div>

      <table className={classes.discipline}>
        <thead>
          <tr>
            <th>Discipline</th>
            <th>Count</th>
            <th>Start (s/c)</th>
            <th>Max (s/c)</th>
          </tr>
        </thead>
        <tbody>
          {result.disciplines
            .sort((a, b) => (a.discipline > b.discipline ? -1 : 1))
            .map((discipline, i) => (
              <DisciplineResult key={i} discipline={discipline} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
