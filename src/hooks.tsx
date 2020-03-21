import { useEffect, useRef } from "react";

export const useInterval = (
  callback: () => void,
  delay: number,
  ...rest: any
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, ...rest]);
};
