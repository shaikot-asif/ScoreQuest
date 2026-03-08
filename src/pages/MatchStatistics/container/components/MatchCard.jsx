import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const getCountdown = (date) => {
  const diff = new Date(date).getTime() - Date.now();

  if (diff <= 0) {
    return "Starting now";
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h to start`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m to start`;
  }

  return `${minutes}m ${seconds}s to start`;
};

const getTossSummary = (match) => {
  if (!match?.toss?.tossWinner) {
    return getCountdown(match?.date);
  }

  const requestingTeam = match?.teams?.requestingTeam;
  const requestedTeam = match?.teams?.requestedTeam;
  const tossWinner =
    match?.toss?.tossWinner?.toString() === requestingTeam?.userId?.toString()
      ? requestingTeam?.name
      : requestedTeam?.name;

  const inningsType = match?.toss?.inningsType
    ? ` and chose to ${match.toss.inningsType}`
    : "";

  return `${tossWinner} won the toss${inningsType}`;
};

const MatchCard = ({ match, parentClass }) => {
  const [countdown, setCountdown] = useState(getTossSummary(match));

  useEffect(() => {
    setCountdown(getTossSummary(match));

    if (match?.toss?.tossWinner) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCountdown(getCountdown(match?.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [match]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      className={`${parentClass}`}
    >
      <Link
        to={`/match-statistics/${match?._id}`}
        className="scorequest-glass block h-full rounded-[28px] p-6 transition duration-300 hover:border-secondary-goldenPoppy/50"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-secondary-goldenPoppy/20 bg-secondary-goldenPoppy/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary-goldenPoppy">
            Match Center
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
            {new Date(match?.date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
          {match?.teams?.requestingTeam?.name}
          <span className="mx-2 text-slate-500">vs</span>
          {match?.teams?.requestedTeam?.name}
        </h3>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Match Status
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">{countdown}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Format
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {match?.overs ? `${match.overs} overs` : "Overs not set yet"}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Match Note
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {match?.toss?.tossWinner
              ? countdown
              : "Countdown updates live until the match starts."}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default MatchCard;
