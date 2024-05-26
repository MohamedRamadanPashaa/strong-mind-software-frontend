import { memo } from "react";

const SelectElement = ({ label, onChange, length, value, optionsArray }) => {
  const options =
    optionsArray || Array.from({ length: length }, (_, i) => i + 1);

  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectElement);
