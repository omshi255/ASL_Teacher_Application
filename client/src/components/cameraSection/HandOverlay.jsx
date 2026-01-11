import { useEffect, useRef } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

const HandOverlay = ({ results, width, height, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    if (!results?.multiHandLandmarks) return;

    results.multiHandLandmarks.forEach((landmarks) => {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        color,
        lineWidth: 2,
      });

      drawLandmarks(ctx, landmarks, {
        color,
        lineWidth: 2,
      });
    });
  }, [results, width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 scale-x-[-1]"
    />
  );
};

export default HandOverlay;
