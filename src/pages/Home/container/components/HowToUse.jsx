import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const checklist = [
  "Set toss, innings type, overs, and squads before play starts.",
  "Update each ball with runs, wickets, strike changes, and bowler changes.",
  "Open the live score page to follow momentum and share the result after the match.",
];

const HowToUse = () => {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="scorequest-glass overflow-hidden rounded-[36px] p-3 sm:p-4"
          >
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-secondary-goldenPoppy" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <p className="ml-3 text-sm text-slate-300">
                  ScoreQuest quick guide
                </p>
              </div>

              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/LxxDV1Rkq28"
                  title="How to use ScoreQuest"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
                Learn Fast
              </p>
              <h2 className="scorequest-section-title mt-4 max-w-xl font-black text-white">
                A short walkthrough for first-time scorers.
              </h2>
              <p className="scorequest-section-copy mt-5 max-w-xl text-base leading-7 sm:text-lg">
                Learn the scoring flow before you start a match, so setup,
                live updates, and sharing feel familiar from the first use.
              </p>
            </div>

            <div className="space-y-3">
              {checklist.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="scorequest-glass rounded-2xl px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 text-lg text-secondary-goldenPoppy" />
                    <p className="text-sm leading-7 text-slate-200 sm:text-base">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/today-match"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
            >
              Watch Live Scoreboards
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
