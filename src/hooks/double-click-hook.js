import { useEffect, useRef } from "react";

const useArrowDoubleClick = (keyPressed, last, callback) => {
  const keyPressCount = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === keyPressed) {
        last && keyPressCount.current++;

        if (keyPressCount.current === 2) {
          callback();
          keyPressCount.current = 0;
        }

        // Reset the count after a short delay
        setTimeout(() => {
          keyPressCount.current = 0;
        }, 200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, keyPressed, last]);

  return null;
};

export default useArrowDoubleClick;
