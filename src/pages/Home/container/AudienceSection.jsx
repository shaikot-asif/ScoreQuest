import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { LuTrophy, LuUsers } from "react-icons/lu";
import { MdOutlineScoreboard } from "react-icons/md";

const audiences = [
  {
    icon: <MdOutlineScoreboard />,
    role: "Scorers",
    title: "Keep the innings moving without losing match context",
    copy: "The operator needs quick actions, visible status, and fewer moments of uncertainty while entering each ball.",
  },
  {
    icon: <LuTrophy />,
    role: "Clubs and organizers",
    title: "Present fixtures and results like a proper competition product",
    copy: "Recent results, live matches, and player performance are surfaced clearly so the platform feels active and managed.",
  },
  {
    icon: <LuUsers />,
    role: "Players and supporters",
    title: "Follow the match story even when you are not at the ground",
    copy: "Clean scorecards, recent events, and readable result cards make the score easier to trust and revisit later.",
  },
];

const AudienceSection = () => {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Who It Serves
            </p>
            <h2 className="scorequest-section-title mt-4 font-black text-white">
              Different users, one live scoring experience.
            </h2>
          </div>

          <p className="scorequest-section-copy max-w-2xl text-base leading-7 sm:text-lg">
            A strong homepage should show why the product matters for the
            scorer, the organizing team, and the people following the match.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {audiences.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}
              className="scorequest-glass flex h-full flex-col rounded-[30px] p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-goldenPoppy text-3xl text-slate-950">
                {item.icon}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-secondary-goldenPoppy">
                {item.role}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">{item.title}</h3>
              <p className="scorequest-section-copy mt-4 flex-1 text-sm leading-7 sm:text-base">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/player-rank"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
          >
            Explore Player Rankings
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
