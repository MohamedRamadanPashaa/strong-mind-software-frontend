import classes from "./SelectDiscipline.module.css";

export default function MultipleSelect({
  options,
  id,
  disciplines,
  onInput,
  className,
}) {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let value = [...disciplines];

    if (value.includes(selectedValue)) {
      value = value.filter((opt) => opt !== selectedValue);
    } else {
      value.push(selectedValue);
    }

    const isValid = value.length > 0;

    onInput(id, value, isValid);
  };

  return (
    <div
      className={`${classes["select-discipline"]} ${
        className ? classes[className] : undefined
      } ${classes["multi-select"]}`}
    >
      <label htmlFor={id}>Choose Disciplines</label>
      <select
        multiple={true}
        value={disciplines}
        onChange={handleSelectChange}
        id={id}
      >
        {options.map((option, index) => (
          <option key={index} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
