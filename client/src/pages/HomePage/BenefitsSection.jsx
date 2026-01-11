// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BENEFITS } from "./constants.js";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const BenefitsSection = () => {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why ASL Teacher
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Designed for real learning, not just visual demos.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BENEFITS.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="
                group relative overflow-hidden
                rounded-2xl bg-white
                border border-gray-200
                px-8 py-9
                shadow-sm transition-all duration-300
                hover:shadow-md hover:border-gray-300
              "
            >
              {/* TOP BORDER (HOVER ONLY) */}
              <div
                className="
                  absolute top-0 left-0 w-full h-[3px]
                  bg-indigo-600
                  scale-x-0 origin-left
                  transition-transform duration-300 ease-out
                  group-hover:scale-x-100
                "
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600
                                flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>

                <p className="text-lg font-semibold text-gray-900">
                  {item.title}
                </p>

                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
