import React from "react";
import { BsBroadcastPin } from "react-icons/bs";
import { MdOutlineLeaderboard, MdOutlineMobileFriendly } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import FeaturesCard from "./components/FeaturesCard";

const features = [
  {
    icon: <BsBroadcastPin />,
    title: "Realtime match control",
    text: "Update every ball, wicket, extra, and over from a single scoring flow without refreshing the page or juggling spreadsheets.",
    eyebrow: "Live scoring",
    stat: "Ball-by-ball",
  },
  {
    icon: <TfiStatsUp />,
    title: "Player and innings insight",
    text: "Track batter, bowler, and team performance as the match unfolds so scorecards and rankings stay useful after the final ball.",
    eyebrow: "Statistics",
    stat: "Auto-updated",
  },
  {
    icon: <MdOutlineMobileFriendly />,
    title: "Built for scorers on the move",
    text: "The interface stays usable on phones at the ground and on desktops in the pavilion, so the same workflow works everywhere.",
    eyebrow: "Cross-device",
    stat: "Responsive",
  },
  {
    icon: <MdOutlineLeaderboard />,
    title: "Clear story for viewers",
    text: "Fans do not need to decode raw numbers. Match state, momentum, and completed results stay readable at a glance.",
    eyebrow: "Viewer UX",
    stat: "Readable fast",
  },
];

const KeyFeatures = () => {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Why ScoreQuest
            </p>
            <h2 className="scorequest-section-title mt-4 max-w-xl font-black text-white">
              Built for live cricket, not generic dashboards.
            </h2>
          </div>

          <p className="scorequest-section-copy max-w-2xl text-base leading-7 sm:text-lg">
            ScoreQuest keeps the interface focused on what matters during a
            match: fast scoring actions for the operator and instant context
            for viewers following the game.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeaturesCard
              key={feature.title}
              {...feature}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
