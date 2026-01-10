import { useState } from "react";
import CameraFeed from "../components/Camera/CameraFeed";
import { LEARN_SIGNS } from "../utils/learnSigns";

const Learn = () => {
  const [index, setIndex] = useState(0);
  const sign = LEARN_SIGNS[index];

  return (
    <div className="min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Learning Mode</h1>

      <h2 className="text-lg mb-2">
        Practice: <b>{sign.name}</b>
      </h2>

      <img src={sign.image} alt={sign.name} className="mx-auto w-40 mb-3" />

      <p className="mb-4 text-gray-600">{sign.instruction}</p>

      <CameraFeed currentSign={sign.name} />

      <button
        className="mt-4 bg-indigo-600 text-white px-4 py-2"
        onClick={() => setIndex((i) => (i + 1) % LEARN_SIGNS.length)}
      >
        Next Sign
      </button>
    </div>
  );
};

export default Learn;
