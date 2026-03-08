import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";

const faqItems = [
  {
    question: "Can one person update the match live from a phone?",
    answer:
      "Yes. The flow is built around a single scorer being able to manage ball-by-ball updates while the rest of the audience follows the live scoreboard.",
  },
  {
    question: "Does the platform stay useful after the match ends?",
    answer:
      "Yes. Completed fixtures, results, and player statistics remain part of the product so the match is still valuable after live play finishes.",
  },
  {
    question: "Why add more homepage sections for this app?",
    answer:
      "Because a realtime cricket scoring product has more to explain than a normal landing page. Visitors need to understand live scoring, match flow, audience value, and result tracking quickly.",
  },
  {
    question: "Will these new sections slow down the page too much?",
    answer:
      "The new sections are mostly lightweight React and Tailwind layouts with restrained motion. The main existing weight is still the hero video and overall app bundle, not the added sections themselves.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="scorequest-glass rounded-[36px] p-6 sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              FAQ
            </p>
            <h2 className="scorequest-section-title mt-4 max-w-xl font-black text-white">
              A few questions the homepage should answer directly.
            </h2>
            <p className="scorequest-section-copy mt-5 max-w-xl text-base leading-7 sm:text-lg">
              This keeps the product pitch practical. Instead of only showing
              visuals, the page now answers the obvious questions users will
              have about live scoring and match coverage.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
            >
              Create an account
            </Link>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="scorequest-glass rounded-[26px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                      {isOpen ? <FiMinus /> : <FiPlus />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-5 py-5">
                          <p className="scorequest-section-copy text-sm leading-7 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
