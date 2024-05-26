const CustomSettings = ({
  amount,
  type,
  setAmount,
  memoTime,
  setMemoTime,
  recallTime,
  setRecallTime,
}) => {
  return (
    <>
      <div>
        <label>Amount</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => {
            if (type !== "spoken") {
              localStorage.setItem(`${type}Amount`, e.target.value);
              setAmount(e.target.value);
            } else {
              const customAmount = e.target.value * 1;
              localStorage.setItem(`spokenCustomAmount`, customAmount);
              setAmount(customAmount);
              setMemoTime(customAmount + 10);
              localStorage.setItem(`spokenCustomMemo`, customAmount + 10);
              if (customAmount <= 100) {
                localStorage.setItem(`spokenCustomRecall`, 5);
                setRecallTime(5);
              } else if (customAmount > 100 && customAmount <= 300) {
                localStorage.setItem(`spokenCustomRecall`, 15);
                setRecallTime(15);
              } else if (customAmount > 300) {
                localStorage.setItem(`spokenCustomRecall`, 25);
                setRecallTime(25);
              }
            }
          }}
        />
      </div>

      {type !== "spoken" && (
        <div>
          <label>Memorization Time (Minutes)</label>
          <input
            type="number"
            min={0.1}
            value={memoTime}
            onChange={(e) => {
              localStorage.setItem(`${type}Memo`, e.target.value);
              setMemoTime(e.target.value);
            }}
          />
        </div>
      )}

      {type !== "spoken" && (
        <div>
          <label>Recall Time (Minutes)</label>
          <input
            type="number"
            min={0.1}
            value={recallTime}
            onChange={(e) => {
              localStorage.setItem(`${type}Recall`, e.target.value);
              setRecallTime(e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomSettings;
