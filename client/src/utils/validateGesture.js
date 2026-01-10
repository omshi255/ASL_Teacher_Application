import { gestureRules } from "../utils/gestureRules";

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const fingerOpen = (tip, pip, wrist) => dist(tip, wrist) > dist(pip, wrist);

const fingerClosed = (tip, pip, wrist) => dist(tip, wrist) < dist(pip, wrist);

export const validateGesture = (lm, sign) => {
  if (!lm) return null;

  const rule = gestureRules[sign];
  if (!rule) return null;

  const wrist = lm[0];

  const indexTip = lm[8],
    indexPip = lm[6];
  const middleTip = lm[12],
    middlePip = lm[10];
  const ringTip = lm[16],
    ringPip = lm[14];
  const pinkyTip = lm[20],
    pinkyPip = lm[18];
  const thumbTip = lm[4];

  const indexOpen = fingerOpen(indexTip, indexPip, wrist);
  const middleOpen = fingerOpen(middleTip, middlePip, wrist);

  const indexClosed = fingerClosed(indexTip, indexPip, wrist);
  const middleClosed = fingerClosed(middleTip, middlePip, wrist);
  const ringClosed = fingerClosed(ringTip, ringPip, wrist);
  const pinkyClosed = fingerClosed(pinkyTip, pinkyPip, wrist);

  switch (rule.type) {
    case "open_palm":
      // Hello / Stop (approximate)
      return indexOpen && middleOpen;

    case "fist":
      return indexClosed && middleClosed;

    case "index_middle_open":
      return indexOpen && middleOpen && ringClosed && pinkyClosed;

    case "thumb_up":
      return thumbTip.y < wrist.y;

    default:
      return false;
  }
};
