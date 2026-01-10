import { useState } from "react";
import { validateGesture } from "../../utils/handValidation.js";

export const useHandGesture = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

  const processLandmarks = (landmarks) => {
    if (!landmarks) {
      setIsCorrect(false);
      setMessage("Show your hand");
      return;
    }

    const valid = validateGesture(landmarks, "A");

    setIsCorrect(valid);
    setMessage(valid ? "Correct Gesture ✅" : "Wrong Gesture ❌");
  };

  return { isCorrect, message, processLandmarks };
};
