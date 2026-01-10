export const getFingerState = (landmarks) => {
  return {
    thumb: landmarks[4].y < landmarks[3].y,
    index: landmarks[8].y < landmarks[6].y,
    middle: landmarks[12].y < landmarks[10].y,
    ring: landmarks[16].y < landmarks[14].y,
    pinky: landmarks[20].y < landmarks[18].y,
  };
};

export const isOpenPalm = (fingers) =>
  fingers.thumb &&
  fingers.index &&
  fingers.middle &&
  fingers.ring &&
  fingers.pinky;

export const isFist = (fingers) =>
  !fingers.thumb &&
  !fingers.index &&
  !fingers.middle &&
  !fingers.ring &&
  !fingers.pinky;
