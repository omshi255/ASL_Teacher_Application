/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CameraFeed from "../components/cameraSection/CameraFeed";
import { fetchSigns } from "../services/signs.service";
import { speak } from "../utils/tts";

import {
  FiVolume2,
  FiVolumeX,
  FiCamera,
  FiCameraOff,
  FiPlay,
  FiAlertTriangle,
} from "react-icons/fi";

const Learn = () => {
  const [signs, setSigns] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("prompt");

  const [isSpeaking, setIsSpeaking] = useState(false);

  /* ================= LOAD SIGNS ================= */
  useEffect(() => {
    fetchSigns()
      .then((data) => setSigns(data))
      .catch(() => setError("Failed to load signs. Please refresh the page."))
      .finally(() => setLoading(false));
  }, []);

  /* ================= AUTO TEXT TO SPEECH ================= */
  useEffect(() => {
    if (signs.length > 0) {
      const sign = signs[index];
      window.speechSynthesis.cancel();
      speak(`This is the sign for ${sign.name}. ${sign.description}`);
      setIsSpeaking(true);
    }
  }, [index, signs]);

  /* ================= CAMERA PERMISSION ================= */
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());
      setCameraPermission("granted");
      setCameraEnabled(true);
    } catch {
      setCameraPermission("denied");
      setError("Camera permission denied. Please allow camera access.");
    }
  };

  /* ================= AUDIO CONTROLS ================= */
  const handleSpeak = () => {
    const sign = signs[index];
    window.speechSynthesis.cancel();
    speak(`This is the sign for ${sign.name}. ${sign.description}`);
    setIsSpeaking(true);
  };

  const handleStopAudio = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  /* ================= EARLY RETURNS ================= */
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500 gap-2">
        <FiAlertTriangle />
        {error}
      </div>
    );
  }

  if (!signs.length) return null;

  const sign = signs[index];

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* SIGN INFO */}
        <div className="mb-6 bg-gray-50 p-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-indigo-600">
            {sign.name}
          </h2>

          <p className="mt-2 text-gray-700">{sign.description}</p>

          {/* AUDIO CONTROLS */}
          <div className="mt-3 flex gap-3">
            {!isSpeaking ? (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-2 text-indigo-600 text-sm font-medium"
              >
                <FiVolume2 /> Listen
              </button>
            ) : (
              <button
                onClick={handleStopAudio}
                className="flex items-center gap-2 text-red-600 text-sm font-medium"
              >
                <FiVolumeX /> Stop Audio
              </button>
            )}
          </div>
        </div>

        {/* CAMERA + REFERENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CAMERA */}
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b">
              <span className="font-medium">Your Camera</span>

              {cameraPermission === "prompt" ? (
                <button
                  onClick={requestCameraPermission}
                  className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm"
                >
                  Allow Camera
                </button>
              ) : (
                <button
                  onClick={() => setCameraEnabled((p) => !p)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                    ${
                      cameraEnabled
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                >
                  {cameraEnabled ? <FiCameraOff /> : <FiCamera />}
                  {cameraEnabled ? "Turn Off" : "Turn On"}
                </button>
              )}
            </div>

            <div className="h-[320px] flex items-center justify-center bg-black">
              {cameraEnabled && cameraPermission === "granted" ? (
                <CameraFeed currentSign={sign.name} enabled />
              ) : (
                <span className="text-gray-400 text-sm">
                  Camera is turned off
                </span>
              )}
            </div>
          </div>

          {/* REFERENCE */}
          <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-sm font-medium mb-3">Reference Gesture</p>

            {sign.referenceImage && (
              <img
                src={sign.referenceImage}
                alt={sign.name}
                className="max-h-[240px] object-contain rounded"
              />
            )}

            {sign.referenceUrl && (
              <a
                href={sign.referenceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-2 text-indigo-600 text-sm"
              >
                <FiPlay /> Watch Reference Video
              </a>
            )}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() =>
              setIndex((i) => (i === 0 ? signs.length - 1 : i - 1))
            }
            className="px-6 py-2 border rounded-lg"
          >
            Previous
          </button>

          <button
            onClick={() => setIndex((i) => (i + 1) % signs.length)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
