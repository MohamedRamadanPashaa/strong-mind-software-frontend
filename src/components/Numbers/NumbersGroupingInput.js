import React from "react";

const NumbersGroupingInput = ({ grouping, type, setGrouping }) => {
  return (
    <div>
      <label>
        Grouping -e.g. &#39;2&#39; or &#39;22&#39; or &#39;32&#39; ...etc.
      </label>
      <input
        type="number"
        value={grouping}
        onChange={(e) => {
          localStorage.setItem(`${type}Grouping`, e.target.value);
          setGrouping(e.target.value);
        }}
      />
    </div>
  );
};

export default NumbersGroupingInput;
