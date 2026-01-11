// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-center">
        {/* LEFT — CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h1 className="text-[36px] sm:text-[44px] lg:text-[60px] font-extrabold leading-[1.08] text-gray-900">
            Practice American
            <br />
            <span className="text-indigo-600">Sign Language</span>
            <br />
            Through Real Tests
          </h1>

          <p className="mt-6 sm:mt-7 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Use your webcam to perform ASL signs. Our system evaluates hand
            landmarks in real time and provides instant correctness feedback
            with measurable accuracy.
          </p>

          {/* CTA */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <Link
              to="/test"
              className="px-8 sm:px-10 py-3.5 rounded-xl bg-indigo-600 text-white
                         font-semibold shadow-lg hover:bg-indigo-700
                         transition text-center"
            >
              Take ASL Test
            </Link>

            <Link
              to="/signup"
              className="px-8 sm:px-10 py-3.5 rounded-xl border border-gray-300
                         text-gray-700 font-medium hover:bg-gray-50
                         transition text-center"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="hidden lg:flex justify-center"
        >
          <div
            className="relative w-full max-w-sm h-[360px] lg:h-[380px]
                       rounded-3xl border border-gray-200
                       bg-white shadow-xl overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50">
              <p className="text-sm font-medium text-gray-700">
                ASL Test Preview
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Live
              </span>
            </div>

            {/* CAMERA MOCK */}
            <div
              className="relative h-48 bg-gradient-to-br
                         from-gray-100 to-gray-200
                         flex items-center justify-center"
            >
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute inset-3 border-2 border-indigo-400/40 rounded-xl"
              />
              <p className="text-sm text-gray-500">Webcam Feed</p>
            </div>

            {/* DETECTION INFO */}
            <div className="px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Detected Sign</span>
                <span className="font-medium text-gray-900">Hello</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Accuracy</span>
                <span className="font-medium text-indigo-600">92%</span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Hand landmarks detected successfully
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
