import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import HandOverlay from "./HandOverlay";
import { createHands } from "../../utils/hands";
import useGestureValidation from "../hooks/useGestureValidation";
import { speak } from "../../utils/speak";

const CameraFeed = ({ currentSign, testMode = false, onDecision }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const handsRef = useRef(null);

  const [results, setResults] = useState(null);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });

  const { result, processLandmarks } = useGestureValidation(currentSign);

  /* ================= INIT CAMERA + HANDS ================= */
  useEffect(() => {
    if (!videoRef.current) return;

    let isActive = true;

    handsRef.current = createHands((res) => {
      if (isActive) setResults(res);
    });

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        if (!isActive || !handsRef.current || !videoRef.current) return;

        try {
          await handsRef.current.send({
            image: videoRef.current,
          });
        } catch {
          // ignore errors after cleanup
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current.start();

    return () => {
      isActive = false;
      cameraRef.current?.stop();
      cameraRef.current = null;
      handsRef.current?.close?.();
      handsRef.current = null;
    };
  }, []);

  /* ================= TRACK ACTUAL VIDEO SIZE ================= */
  useEffect(() => {
    const updateSize = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      setVideoSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ================= VALIDATION ================= */
  useEffect(() => {
    if (results?.multiHandLandmarks?.length === 1) {
      processLandmarks(results.multiHandLandmarks[0]);
    } else {
      processLandmarks(null);
    }
  }, [results, processLandmarks]);

  /* ================= VOICE FEEDBACK (ON) ================= */
  useEffect(() => {
    if (result === "Correct") speak("Correct sign");
    if (result === "Incorrect") speak("Try again");
  }, [result]);

  const handColor =
    result === "Correct"
      ? "#22c55e"
      : result === "Incorrect"
      ? "#ef4444"
      : "#a1a1aa";

  /* ================= UI ================= */
  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      />

      {/* HAND OVERLAY — perfectly synced */}
      <HandOverlay
        results={results}
        width={videoSize.width}
        height={videoSize.height}
        color={handColor}
      />

      {/* RESULT TEXT */}
      {result && (
        <p
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 font-semibold text-lg
          ${result === "Correct" ? "text-green-500" : "text-red-500"}`}
        >
          {result}
        </p>
      )}

      {/* NEXT BUTTON (TEST MODE) */}
      {testMode && result && (
        <button
          onClick={() => onDecision(result === "Correct")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2
            bg-indigo-600 hover:bg-indigo-700 text-white
            px-6 py-2 rounded-xl shadow-lg transition"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CameraFeed;
