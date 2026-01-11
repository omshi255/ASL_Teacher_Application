const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const getFingerState = (lm) => {
  if (!lm) return null;

  const wrist = lm[0];

  const isOpen = (tip, pip) => dist(lm[tip], wrist) > dist(lm[pip], wrist);

  return {
    thumb: isOpen(4, 3),
    index: isOpen(8, 6),
    middle: isOpen(12, 10),
    ring: isOpen(16, 14),
    pinky: isOpen(20, 18),
  };
};
