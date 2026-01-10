import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import HandOverlay from "./HandOverlay";
import { createHands } from "../../utils/hands";
import useGestureValidation from "../hooks/useGestureValidation";
import { speak } from "../../utils/speak";

const CameraFeed = ({ currentSign, testMode, onDecision }) => {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const handsRef = useRef(null);

  const [results, setResults] = useState(null);

  const { result, processLandmarks } = useGestureValidation(currentSign);

  useEffect(() => {
    if (!videoRef.current) return;

    let isActive = true; // 🔐 SAFETY FLAG

    handsRef.current = createHands((res) => {
      if (!isActive) return;
      setResults(res);
    });

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        if (!isActive || !handsRef.current) return;

        try {
          await handsRef.current.send({
            image: videoRef.current,
          });
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          // silently ignore after unmount
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
  useEffect(() => {
    if (result === "Correct") {
      speak("Correct sign");
    }

    if (result === "Incorrect") {
      speak("Try again");
    }
  }, [result]);

  // Camera init (once)
  useEffect(() => {
    if (!videoRef.current) return;

    handsRef.current = createHands(setResults);

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        await handsRef.current.send({
          image: videoRef.current,
        });
      },
      width: 640,
      height: 480,
    });

    cameraRef.current.start();

    return () => {
      cameraRef.current?.stop();
      handsRef.current?.close?.();
    };
  }, []);

  // Validation
  useEffect(() => {
    if (results?.multiHandLandmarks?.length === 1) {
      processLandmarks(results.multiHandLandmarks[0]);
    } else {
      processLandmarks(null);
    }
  }, [results, processLandmarks]);

  const handColor =
    result === "Correct"
      ? "#00FF00"
      : result === "Incorrect"
      ? "#FF0000"
      : "#AAAAAA";

  return (
    <div className="relative w-[640px] h-[480px] mt-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute w-full h-full scale-x-[-1]"
      />

      <HandOverlay
        results={results}
        width={640}
        height={480}
        color={handColor}
      />

      {/* Result */}
      {result && (
        <p
          className={`absolute bottom-14 left-1/2 -translate-x-1/2 font-semibold ${
            result === "Correct" ? "text-green-600" : "text-red-600"
          }`}
        >
          {result}
        </p>
      )}

      {/* 🔥 LEVEL-5 CONTROL */}
      {testMode && result && (
        <button
          onClick={() => onDecision(result === "Correct")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CameraFeed;
