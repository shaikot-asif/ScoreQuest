import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsBroadcastPin } from "react-icons/bs";
import { IoFlashOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";
import { MdSportsCricket } from "react-icons/md";
import images from "../../../constants/images";

const heroHighlights = [
  "Ball-by-ball updates",
  "Instant player stats",
  "Match timeline sharing",
];

const heroStats = [
  { label: "Live latency", value: "< 2s" },
  { label: "Scoring flow", value: "Every delivery" },
  { label: "Works on", value: "Mobile + desktop" },
];

const liveMoments = [
  {
    over: "16.1",
    event: "Boundary",
    detail: "Cover drive through extra cover for four.",
    accent: "text-emerald-300",
  },
  {
    over: "15.5",
    event: "Wicket",
    detail: "Caught at long-on. Pressure swings back.",
    accent: "text-rose-300",
  },
  {
    over: "15.3",
    event: "Single",
    detail: "Strike rotated to keep the chase moving.",
    accent: "text-sky-300",
  },
];

const Hero = () => {
  const userState = useSelector((state) => state.user);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={images.heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,199,0,0.22),_transparent_20%),linear-gradient(120deg,_rgba(7,11,20,0.86),_rgba(7,11,20,0.72)_36%,_rgba(7,11,20,0.92))]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center gap-16 px-4 pb-20 md:px-6 lg:flex-row lg:items-center lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl lg:w-[54%]"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 backdrop-blur">
            <span className="scorequest-pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
            Realtime scoring for local cricket, academies, and leagues
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            className="scorequest-section-title max-w-2xl font-black text-white"
          >
            Manage the scoreboard live while everyone follows the match.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="scorequest-section-copy mt-6 max-w-2xl text-base leading-7 sm:text-lg"
          >
            ScoreQuest replaces pen-and-paper scoring with a live match desk for
            runs, wickets, overs, player stats, and match momentum. Update one
            ball and every viewer sees it immediately.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {heroHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-slate-950/35 px-4 py-2 text-sm text-slate-100 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap"
          >
            {!userState.userInfo && (
              <Link
                to="/signup"
                className="scorequest-shimmer inline-flex min-w-[180px] items-center justify-center rounded-full bg-secondary-goldenPoppy px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(253,199,0,0.22)]"
              >
                Start Scoring
              </Link>
            )}
            <Link
              to="/today-match"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
            >
              Explore Live Matches
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="mt-12 grid gap-3 sm:grid-cols-3"
          >
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="scorequest-glass rounded-2xl px-5 py-4"
              >
                <p className="text-2xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="relative lg:w-[46%]"
        >
          <div className="scorequest-float absolute -left-6 top-10 hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100 backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <BsBroadcastPin className="text-base" />
              Auto-refreshing score stream
            </div>
          </div>

          <div className="scorequest-float-delay absolute -right-3 bottom-10 hidden rounded-2xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm text-sky-100 backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <LuShieldCheck className="text-base" />
              Match archive and player history
            </div>
          </div>

          <div className="scorequest-glass scorequest-highlight rounded-[32px] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Live Match Desk
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  City Club vs River XI
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <span className="scorequest-pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
                  2nd innings, chase in progress
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Required
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  18 runs from 22 balls
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.35fr_0.95fr]">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">River XI</p>
                    <p className="mt-2 text-5xl font-black tracking-tight text-white">
                      131/5
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Overs
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-white">
                      16.2
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      CRR
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      8.02
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Batters
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      Hasan 46*
                    </p>
                    <p className="text-sm text-slate-300">Shuvo 12*</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Bowler
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      Rakib
                    </p>
                    <p className="text-sm text-slate-300">3.2-0-24-2</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <IoFlashOutline className="text-lg text-secondary-goldenPoppy" />
                  <p className="text-sm font-semibold text-white">
                    Recent deliveries
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {liveMoments.map((moment) => (
                    <div
                      key={`${moment.over}-${moment.event}`}
                      className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                          {moment.over}
                        </span>
                        <span className={`text-sm font-semibold ${moment.accent}`}>
                          {moment.event}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {moment.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <MdSportsCricket className="text-base text-secondary-goldenPoppy" />
                One scorer controls the whole innings
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <BsBroadcastPin className="text-base text-secondary-goldenPoppy" />
                Spectators follow score changes instantly
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
