// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { TEST_FLOW } from "./constants.js";

/* Parent container animation */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

/* Card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const TestFlowSection = () => {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 mb-14"
        >
          How the ASL Test Works
        </motion.h2>

        {/* FLOW */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-4 gap-10"
        >
          {TEST_FLOW.map((step, i) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="
                relative rounded-2xl bg-white p-8
                border border-gray-200 shadow-sm
                hover:shadow-md transition
              "
            >
              {/* STEP NUMBER */}
              <div
                className="
                absolute -top-5 left-6 w-10 h-10
                rounded-full bg-indigo-600 text-white
                flex items-center justify-center
                font-bold shadow
              "
              >
                {i + 1}
              </div>

              <p className="mt-6 font-semibold text-gray-900">{step.title}</p>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestFlowSection;
