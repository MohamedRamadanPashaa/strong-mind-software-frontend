import classes from "./DisciplineResult.module.css";

export default function DisciplineResult({ discipline }) {
  return (
    <tr>
      <td className={classes["discipline-title"]}>{discipline.discipline}</td>
      <td>{discipline.countDiscipline}</td>
      <td>
        {discipline.firstScore}/{discipline.firstCorrect}
      </td>
      <td>
        {discipline.maxScore}/{discipline.maxCorrect}
      </td>
    </tr>
  );
}
