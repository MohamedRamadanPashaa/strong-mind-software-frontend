import { useEffect } from "react";

const useKeyPress = (targetKey, action) => {
  useEffect(() => {
    const downHandler = (e) => {
      if (e.key === targetKey) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKey, action]);
};

export default useKeyPress;
