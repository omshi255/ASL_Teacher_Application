/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState, useCallback } from "react";
import { validateGesture } from "../../utils/validateGesture";

const useGestureValidation = (currentSign) => {
  const [result, setResult] = useState(null);
  const bufferRef = useRef([]);

  useEffect(() => {
    bufferRef.current = [];
    setResult(null);
  }, [currentSign]);

  const processLandmarks = useCallback(
    (landmarks) => {
      const ok = validateGesture(landmarks, currentSign);
      if (ok === null) {
        setResult(null);
        return;
      }

      bufferRef.current.push(ok);
      if (bufferRef.current.length > 5) bufferRef.current.shift();

      const trueCount = bufferRef.current.filter(Boolean).length;
      const falseCount = bufferRef.current.length - trueCount;

      if (trueCount >= 3) setResult("Correct");
      else if (falseCount >= 3) setResult("Incorrect");
      else setResult(null);
    },
    [currentSign]
  );

  return { result, processLandmarks };
};

export default useGestureValidation;
