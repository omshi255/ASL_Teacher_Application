import { useEffect, useState } from "react";
import CameraFeed from "../components/cameraSection/CameraFeed";
import { fetchSigns } from "../services/signs.service";
import {
  FiVolume2,
  FiVolumeX,
  FiCamera,
  FiCameraOff,
  FiPlay,
} from "react-icons/fi";

const BOX_HEIGHT = "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]";

const Learn = () => {
  const [signs, setSigns] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("prompt");

  /* ================= LOAD SIGNS ================= */
  useEffect(() => {
    fetchSigns()
      .then((data) => setSigns(data))
      .catch(() => setError("Failed to load signs"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= CAMERA PERMISSION ================= */
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());
      setCameraPermission("granted");
      setCameraEnabled(true);
    } catch {
      setCameraPermission("denied");
      setCameraEnabled(false);
    }
  };

  /* ================= SPEECH ================= */
  const toggleSpeech = (text) => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
  };

  /* ================= STATES ================= */
  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        {error}
      </div>
    );

  if (!signs.length) return null;

  const sign = signs[index];

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8">
          {/* ================= SIGN INFO ================= */}
          <div className="mb-8 sm:mb-10 bg-gray-50 rounded-2xl p-5 sm:p-6 shadow">
            <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600">
              {sign.name}
            </h2>

            <p className="mt-2 text-gray-700 text-sm sm:text-base">
              {sign.description}
            </p>

            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Difficulty: <span className="font-medium">{sign.difficulty}</span>
            </p>

            <button
              onClick={() => toggleSpeech(sign.description)}
              className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition
                ${
                  isSpeaking
                    ? "text-red-600 bg-red-50 hover:bg-red-100"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
            >
              {isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
              {isSpeaking ? "Stop Audio" : "Listen"}
            </button>
          </div>

          {/* ================= CAMERA + REFERENCE ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* ================= CAMERA ================= */}
            <div
              className={`${BOX_HEIGHT} bg-gray-50 rounded-2xl shadow-sm flex flex-col`}
            >
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  Your Camera
                </span>

                {cameraPermission === "prompt" ? (
                  <button
                    onClick={requestCameraPermission}
                    className="bg-indigo-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm"
                  >
                    Allow Camera
                  </button>
                ) : (
                  <button
                    onClick={() => setCameraEnabled((p) => !p)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium
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

              {/* CAMERA BODY */}
              <div
                className={`relative flex-1 rounded-b-2xl overflow-hidden
                  ${
                    cameraEnabled && cameraPermission === "granted"
                      ? "bg-gray-100"
                      : "bg-black"
                  }`}
              >
                {cameraEnabled && cameraPermission === "granted" ? (
                  <CameraFeed currentSign={sign.name} enabled={cameraEnabled} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                    Camera is turned off
                  </div>
                )}
              </div>
            </div>

            {/* ================= REFERENCE ================= */}
            <div
              className={`${BOX_HEIGHT} bg-gray-50 rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col items-center justify-center`}
            >
              <p className="text-xs sm:text-sm font-medium mb-4 text-gray-700">
                Reference Gesture
              </p>

              {sign.referenceImage ? (
                <img
                  src={sign.referenceImage}
                  alt={sign.name}
                  className="max-h-[220px] sm:max-h-[260px] lg:max-h-[280px] object-contain rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <p className="text-gray-400 text-xs sm:text-sm">
                  No reference image available
                </p>
              )}

              {sign.referenceUrl && (
                <a
                  href={sign.referenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-2 text-indigo-600 text-xs sm:text-sm font-medium"
                >
                  <FiPlay /> Watch Reference Video
                </a>
              )}
            </div>
          </div>

          {/* ================= CONTROLS ================= */}
          <div className="mt-8 sm:mt-10 flex justify-center gap-3 sm:gap-4">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? signs.length - 1 : i - 1))
              }
              className="px-5 sm:px-6 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              Previous
            </button>

            <button
              onClick={() => setIndex((i) => (i + 1) % signs.length)}
              className="px-5 sm:px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              Next Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
