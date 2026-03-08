import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineChecklist,
  MdOutlineScoreboard,
  MdOutlineShare,
} from "react-icons/md";

const phases = [
  {
    icon: <MdOutlineChecklist />,
    phase: "Pre-match",
    title: "Prepare teams, toss, overs, and playing flow",
    points: [
      "Add squads and match participants cleanly before the start.",
      "Define toss result, innings type, and overs without leaving the flow.",
      "Give the scorer a stable setup before the first delivery.",
    ],
  },
  {
    icon: <MdOutlineScoreboard />,
    phase: "Live innings",
    title: "Run the scoreboard without breaking concentration",
    points: [
      "Update runs, wickets, wides, no-balls, and strike changes quickly.",
      "Keep batter and bowler figures moving with the live score.",
      "Make the current match state obvious to viewers at a glance.",
    ],
  },
  {
    icon: <MdOutlineShare />,
    phase: "After play",
    title: "Turn live updates into usable records and results",
    points: [
      "Preserve the scoreline for teams, players, and repeat visitors.",
      "Surface recent results and match summaries without extra work.",
      "Keep the product useful after the final ball, not only during play.",
    ],
  },
];

const commandMetrics = [
  "Toss to result in one product flow",
  "Readable status cards for match viewers",
  "Fewer dead spaces on the homepage",
];

const CommandCenter = () => {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="scorequest-glass rounded-[36px] p-6 sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Matchday Control
            </p>
            <h2 className="scorequest-section-title mt-4 max-w-2xl font-black text-white">
              One homepage section that explains the full scoring lifecycle.
            </h2>
            <p className="scorequest-section-copy mt-5 max-w-2xl text-base leading-7 sm:text-lg">
              A realtime cricket app needs to show that it handles more than a
              single score number. This section maps the product from setup to
              live scoring to final record-keeping.
            </p>

            <div className="mt-10 space-y-4">
              {phases.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  className="rounded-[28px] border border-white/10 bg-slate-950/45 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-goldenPoppy text-3xl text-slate-950">
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-goldenPoppy">
                        {item.phase}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <p className="text-sm leading-7 text-slate-200">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            <div className="scorequest-glass rounded-[32px] p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
                Why it matters
              </p>
              <h3 className="mt-4 text-2xl font-bold text-white">
                Good live UX reduces scorer stress.
              </h3>
              <p className="scorequest-section-copy mt-4 text-sm leading-7 sm:text-base">
                In a real match, the operator cannot afford to search around the
                interface. Sections like this reinforce that ScoreQuest is meant
                for active scoring, not only browsing archived data.
              </p>
            </div>

            <div className="scorequest-glass rounded-[32px] p-6 sm:p-7">
              <div className="space-y-3">
                {commandMetrics.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommandCenter;
