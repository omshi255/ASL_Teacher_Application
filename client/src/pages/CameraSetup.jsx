import CameraFeed from "../components/Camera/CameraFeed";

const CameraSetup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-2">
        Camera Setup
      </h2>

      <p className="text-gray-600 mb-4 text-center">
        Allow camera access to detect your hand
      </p>

      <CameraFeed />
    </div>
  );
};

export default CameraSetup;
