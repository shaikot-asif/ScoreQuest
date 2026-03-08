import React from "react";
import { motion } from "framer-motion";
import {
  MdAppRegistration,
  MdEmergencyShare,
  MdOutlineScoreboard,
} from "react-icons/md";

const steps = [
  {
    icon: <MdAppRegistration />,
    title: "Create your match setup",
    description:
      "Add teams, squads, toss details, overs, and match format before the first ball so the scorer has a clean starting point.",
  },
  {
    icon: <MdOutlineScoreboard />,
    title: "Score every delivery live",
    description:
      "Runs, wickets, extras, overs, and player changes update in one flow built for real match pressure, not slow admin forms.",
  },
  {
    icon: <MdEmergencyShare />,
    title: "Share the live scoreboard",
    description:
      "Viewers can follow the game as it happens, and completed matches remain available for results, scorecards, and player performance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="scorequest-glass rounded-[36px] p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Workflow
            </p>
            <h2 className="scorequest-section-title mt-4 font-black text-white">
              A simple match flow for scorers and spectators.
            </h2>
            <p className="scorequest-section-copy mt-5 text-base leading-7 sm:text-lg">
              From match setup to ball-by-ball updates and final sharing, the
              workflow stays aligned with how cricket scoring actually happens
              on the ground.
            </p>
          </div>

          <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.35 }}
                whileHover={{ y: -8 }}
                className="relative rounded-[30px] border border-white/10 bg-slate-950/45 p-6"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-goldenPoppy text-4xl text-slate-950 shadow-[0_18px_32px_rgba(253,199,0,0.18)]">
                    {step.icon}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                    Step 0{index + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="scorequest-section-copy mt-4 text-sm leading-7 sm:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
