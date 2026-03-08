import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const formatOvers = (overs = 0) =>
  `${parseInt(overs / 6, 10)}.${parseInt(overs % 6, 10)}`;

const getResultSummary = (match) => {
  const requestingRuns = parseInt(
    match?.score?.requestingTeam?.totalRuns || 0,
    10
  );
  const requestedRuns = parseInt(match?.score?.requestedTeam?.totalRuns || 0, 10);

  if (requestedRuns < requestingRuns) {
    return `${match?.teams?.requestingTeam?.name} won the match`;
  }

  if (requestedRuns > requestingRuns) {
    return `${match?.teams?.requestedTeam?.name} won the match`;
  }

  return "Match drawn";
};

const FinishedMatchCard = ({ match, parentClass = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      className={parentClass}
    >
      <Link
        to={`/match-statistics/${match?._id}`}
        className="scorequest-glass block h-full rounded-[28px] p-6 transition duration-300 hover:border-secondary-goldenPoppy/50"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
            Completed
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Result
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
          {match?.teams?.requestingTeam?.name}
          <span className="mx-2 text-slate-500">vs</span>
          {match?.teams?.requestedTeam?.name}
        </h3>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {match?.teams?.requestingTeam?.name}
                </p>
                <p className="mt-2 text-2xl font-bold text-secondary-goldenPoppy">
                  {match?.score?.requestingTeam?.totalRuns || 0}
                </p>
              </div>
              <p className="text-sm text-slate-300">
                {formatOvers(match?.score?.requestingTeam?.totalOvers)}
                <span className="ml-1 text-slate-500">ov</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {match?.teams?.requestedTeam?.name}
                </p>
                <p className="mt-2 text-2xl font-bold text-secondary-goldenPoppy">
                  {match?.score?.requestedTeam?.totalRuns || 0}
                </p>
              </div>
              <p className="text-sm text-slate-300">
                {formatOvers(match?.score?.requestedTeam?.totalOvers)}
                <span className="ml-1 text-slate-500">ov</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-secondary-goldenPoppy/20 bg-secondary-goldenPoppy/10 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-secondary-goldenPoppy">
            Match Result
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">
            {getResultSummary(match)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default FinishedMatchCard;
