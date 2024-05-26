const CheckboxInput = ({ onChangeHandler, checked, label, id }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name="check"
        value={"check"}
        checked={checked}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default CheckboxInput;
