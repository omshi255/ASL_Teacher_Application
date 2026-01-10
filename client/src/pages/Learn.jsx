import { useEffect, useState } from "react";
import CameraFeed from "../components/Camera/CameraFeed.jsx";
import { fetchSigns } from "../services/signs.service";

const Learn = () => {
  const [signs, setSigns] = useState([]);

  useEffect(() => {
    fetchSigns().then(setSigns);
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <CameraFeed />

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Learn ASL Signs
        </h2>

        {signs.length > 0 && (
          <>
            <h3 className="font-medium">
              {signs[0].name}
            </h3>
            <p className="text-sm text-gray-600">
              {signs[0].description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Learn;
