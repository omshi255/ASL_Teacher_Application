import { Link } from "react-router-dom";

const Landing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold">ASL Teacher</h1>
    <p className="mt-4 text-gray-600">
      Learn American Sign Language interactively
    </p>

    <div className="mt-6 space-x-4">
      <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded">
        Login
      </Link>
      <Link to="/signup" className="px-4 py-2 border rounded">
        Sign Up
      </Link>
    </div>
  </div>
);

export default Landing;
