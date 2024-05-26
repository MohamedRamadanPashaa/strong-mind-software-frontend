const CountSecondsInput = ({ countSeconds, setCountSeconds }) => {
  return (
    <div>
      <label>Count Down (1-60 sec)</label>
      <input
        type="number"
        min={1}
        max={60}
        value={countSeconds}
        onChange={(e) => {
          localStorage.setItem("countSeconds", e.target.value);
          setCountSeconds(e.target.value);
        }}
      />
    </div>
  );
};

export default CountSecondsInput;
