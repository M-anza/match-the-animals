import { useEffect, useRef } from "react";

const Timer = ({ isActive, onTimeUpdate }) => {
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        onTimeUpdate(elapsed);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, onTimeUpdate]);

  return null;
};

export default Timer;
