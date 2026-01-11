import { gestureRules } from "./gestureRules";
import { getFingerState } from "./fingerState";

export const validateGesture = (lm, signName) => {
  if (!lm || !signName) return null;

  const rule = gestureRules[signName];
  if (!rule) return null;

  const fingers = getFingerState(lm);
  if (!fingers) return null;

  switch (rule.type) {
    case "open_palm":
      return fingers.index && fingers.middle && fingers.ring && fingers.pinky;

    case "fist":
      return (
        !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky
      );

    case "index_middle_open":
      return fingers.index && fingers.middle && !fingers.ring && !fingers.pinky;

    case "index_only":
      return (
        fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky
      );

    case "thumb_up":
      return (
        fingers.thumb &&
        lm[4].y < lm[0].y && // ✅ thumb ABOVE wrist
        !fingers.index &&
        !fingers.middle
      );

    case "thumb_down":
      return (
        fingers.thumb &&
        lm[4].y > lm[0].y && // ✅ thumb BELOW wrist
        !fingers.index &&
        !fingers.middle
      );

    default:
      return false;
  }
};
