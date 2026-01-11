import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-indigo-100 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* LEFT — BRAND */}
          <div>
            <p className="text-base font-semibold text-indigo-700">
              ASL Teacher
            </p>
            <p className="mt-3 text-sm text-gray-600 max-w-xs leading-relaxed">
              Practice American Sign Language through real camera-based tests
              with instant feedback and progress tracking.
            </p>
          </div>

          {/* CENTER — LINKS */}
          <div className="flex md:justify-center gap-8 text-sm font-medium">
            <Link
              to="/test"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Take Test
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* RIGHT — COPYRIGHT */}
          <div className="md:text-right text-sm text-gray-500 leading-relaxed">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-700">ASL Teacher</span>
            <br />
            Built for learning. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
