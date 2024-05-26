import classes from "./SelectDiscipline.module.css";

const SelectDiscipline = ({ selectData, title, setTitle, className }) => {
  return (
    <div
      className={`${classes["select-discipline"]} ${
        className ? classes[className] : undefined
      }`}
    >
      <select value={title} onChange={(e) => setTitle(e.target.value)}>
        {selectData.map((data) => (
          <option key={data.title} value={data.title}>
            {data.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDiscipline;
