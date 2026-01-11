import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import aslDemo from "../../assets/asl_demo.png";

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT — VISUAL (image-style, not card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* concentric rings */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-indigo-200" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-indigo-300" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-indigo-400" />

          {/* image */}
          <img
            src={aslDemo}
            alt="ASL gesture demonstration"
            className="relative z-10 w-72 drop-shadow-xl"
          />
        </motion.div>

        {/* RIGHT — CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            How the ASL Test Works
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
            ASL Teacher uses real-time camera input to evaluate how accurately
            you perform sign language gestures. The experience is designed to
            feel natural, guided, and measurable.
          </p>

          {/* STEPS — text only (NO cards) */}
          <div className="mt-10 space-y-6">
            <Step
              index="01"
              title="Perform the Sign"
              desc="You are shown a sign prompt and perform it naturally in front of your webcam."
            />
            <Step
              index="02"
              title="Live Hand Analysis"
              desc="Your hand landmarks are tracked instantly using vision models."
            />
            <Step
              index="03"
              title="Accuracy Evaluation"
              desc="The system evaluates correctness and alignment with the expected sign."
            />
            <Step
              index="04"
              title="Progress Tracking"
              desc="Each attempt is saved so you can see improvement over time."
            />
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/test")}
            className="mt-12 inline-flex items-center gap-3
                       rounded-xl bg-indigo-600 px-10 py-4
                       text-white font-semibold shadow-lg
                       hover:bg-indigo-700 transition"
          >
            Try ASL Test Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

/* -------- helper component -------- */

const Step = ({ index, title, desc }) => (
  <div className="flex items-start gap-5">
    <div className="text-indigo-600 font-semibold text-sm mt-1">{index}</div>
    <div>
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);
