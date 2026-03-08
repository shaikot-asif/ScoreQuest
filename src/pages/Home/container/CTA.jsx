import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const benefits = [
  "Replace manual scorebooks with a faster live workflow.",
  "Keep player statistics aligned with what happens in the match.",
  "Give spectators a scoreboard that feels current and trustworthy.",
];

const CTA = () => {
  const userState = useSelector((state) => state.user);

  return (
    <section className="pb-24 pt-10 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(135deg,_rgba(253,199,0,0.16),_rgba(15,23,42,0.96)_26%,_rgba(15,23,42,0.98)_74%,_rgba(34,211,238,0.12))] p-8 sm:p-10 lg:p-12"
        >
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary-goldenPoppy/10 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
                Start Now
              </p>
              <h2 className="scorequest-section-title mt-4 max-w-2xl font-black text-white">
                Bring your next cricket match online with live scoring that
                feels deliberate.
              </h2>
              <p className="scorequest-section-copy mt-5 max-w-2xl text-base leading-7 sm:text-lg">
                Organizers, scorers, and supporters all need the same thing: a
                scoreboard that updates fast and stays understandable from the
                first ball to the final result.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
                {!userState.userInfo && (
                  <Link
                    to="/signup"
                    className="scorequest-shimmer inline-flex items-center justify-center rounded-full bg-secondary-goldenPoppy px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(253,199,0,0.22)]"
                  >
                    Create Free Account
                  </Link>
                )}

                <Link
                  to="/today-match"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
                >
                  View Live Scores
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {benefits.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  className="scorequest-glass rounded-[24px] px-5 py-4"
                >
                  <p className="text-sm leading-7 text-slate-100 sm:text-base">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
