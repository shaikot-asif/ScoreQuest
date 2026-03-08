import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getTodayMatch } from "../../../service/match";
import MatchCard from "../../MatchStatistics/container/components/MatchCard";
import Loading from "../../../components/shared/Loading/Loading";

const TodayMatch = () => {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["todayMatch"],
    queryFn: () => getTodayMatch({ limit: 3, page: 1, searchKeywords: "" }),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Live Right Now
            </p>
            <h2 className="scorequest-section-title mt-4 font-black text-white">
              Active match cards that feel like scoreboards, not placeholders.
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="scorequest-section-copy text-base leading-7 sm:text-lg">
              Follow today&apos;s fixtures with quick status, countdown, and
              direct access to the scoreboard from the first scroll.
            </p>
            <Link
              to="/today-match"
              className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
            >
              Open Match Center
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="scorequest-glass rounded-[32px] p-10">
            <Loading />
          </div>
        ) : Array.isArray(matches) && matches.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {matches.slice(0, 3).map((match) => (
              <MatchCard
                key={match?._id}
                match={match}
                parentClass="h-full"
              />
            ))}
          </div>
        ) : (
          <div className="scorequest-glass rounded-[32px] px-6 py-10 text-center">
            <p className="text-xl font-semibold text-white">
              No live matches are scheduled for today yet.
            </p>
            <p className="scorequest-section-copy mt-3 text-sm leading-7 sm:text-base">
              When a match is added, it will appear here with a live countdown
              and quick access to the scoreboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TodayMatch;
