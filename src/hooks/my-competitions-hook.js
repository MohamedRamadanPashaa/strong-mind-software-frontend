import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMyCompetitions } from "../store/resultSlice";

const useMyCompetitions = (standard) => {
  const [standardLoading, setStandardLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyCompetitions = async () => {
      try {
        const res = await fetch(
          `/api/v1/competitions/my-competitions/${standard}`
        );

        const { data } = await res.json();

        if (res.ok) {
          dispatch(setMyCompetitions(data.competitions));
        }
      } catch (error) {
        console.log(error);
      }

      setStandardLoading(false);
    };

    getMyCompetitions();
  }, [standard, dispatch]);

  return { standardLoading };
};

export default useMyCompetitions;
