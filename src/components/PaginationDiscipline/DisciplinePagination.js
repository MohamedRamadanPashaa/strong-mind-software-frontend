import classes from "./DisciplinePagination.module.css";

const DisciplinePagination = ({ setTitle, title, paginationData }) => {
  return (
    <ul className={classes["discipline-pagination"]}>
      {paginationData.map((el) => (
        <li
          className={`${el.title === title ? classes.active : undefined}`}
          onClick={() => setTitle(el.title)}
          key={el.title}
        >
          {el.shortTitle}
        </li>
      ))}
    </ul>
  );
};

export default DisciplinePagination;
