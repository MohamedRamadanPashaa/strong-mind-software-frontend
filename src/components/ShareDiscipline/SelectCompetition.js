import { useDispatch, useSelector } from "react-redux";
import { setCompetitionId } from "../../store/resultSlice";
import { useEffect } from "react";

const SelectCompetition = ({ options }) => {
  const dispatch = useDispatch();
  const { competitionId } = useSelector((state) => state.result);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setCompetitionId(localStorage.getItem("competitionId") || ""));
    }
  }, [dispatch]);

  return (
    <div>
      <label>Competition</label>
      <select
        value={competitionId}
        onChange={(e) => {
          localStorage.setItem("competitionId", e.target.value);
          dispatch(setCompetitionId(e.target.value));
        }}
      >
        <option value=""></option>

        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.competitionName} Season {opt.season}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCompet