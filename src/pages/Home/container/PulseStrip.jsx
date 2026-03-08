import React from "react";
import { motion } from "framer-motion";
import { BsBroadcastPin } from "react-icons/bs";
import { GiCricketBat } from "react-icons/gi";
import { IoFlashOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";

const pulseItems = [
  {
    icon: <BsBroadcastPin />,
    title: "Live feed",
    stat: "Every ball reflected instantly",
    copy: "Runs, wickets, extras, and over progress stay aligned with the live scoreboard.",
  },
  {
    icon: <GiCricketBat />,
    title: "Batting context",
    stat: "Strike, partnerships, pressure",
    copy: "The page highlights what the batting side needs now, not just the raw total.",
  },
  {
    icon: <IoFlashOutline />,
    title: "Momentum",
    stat: "Recent events remain visible",
    copy: "Boundary bursts, wickets, and chase swings stay easy to scan for spectators.",
  },
  {
    icon: <RiTeamLine />,
    title: "Match roles",
    stat: "Useful for scorers and viewers",
    copy: "The same interface supports the operator on the ground and the audience following remotely.",
  },
];

const PulseStrip = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 xl:grid-cols-4">
          {pulseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -4 }}
              className="scorequest-glass rounded-[26px] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-goldenPoppy text-2xl text-slate-950">
                  {item.icon}
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                  Pulse
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-secondary-goldenPoppy">
                {item.title}
              </p>
              <h3 className="mt-3 text-xl font-bold text-white">{item.stat}</h3>
              <p className="scorequest-section-copy mt-3 text-sm leading-7">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PulseStrip;
