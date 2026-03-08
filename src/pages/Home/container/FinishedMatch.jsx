import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCompleteMatch } from "../../../service/match";
import FinishedMatchCard from "../../MatchStatistics/container/components/FinishedMatchCard";
import Loading from "../../../components/shared/Loading/Loading";

const FinishedMatch = () => {
  const { data: match, isLoading } = useQuery({
    queryKey: ["completeMatch"],
    queryFn: () =>
      getCompleteMatch({
        searchKeywords: "",
        limit: 6,
        page: 1,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary-goldenPoppy">
              Recent Results
            </p>
            <h2 className="scorequest-section-title mt-4 font-black text-white">
              Completed matches stay readable after the last ball.
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="scorequest-section-copy text-base leading-7 sm:text-lg">
              Review recent scorelines quickly, then open the full match view
              for scorecards, innings detail, and player performance context.
            </p>
            <Link
              to="/finished-match"
              className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-secondary-goldenPoppy hover:bg-white/10"
            >
              Browse All Results
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="scorequest-glass rounded-[32px] p-10">
            <Loading />
          </div>
        ) : Array.isArray(match) && match.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {match.slice(0, 6).map((item) => (
              <FinishedMatchCard
                key={item?._id}
                match={item}
                parentClass="h-full"
              />
            ))}
          </div>
        ) : (
          <div className="scorequest-glass rounded-[32px] px-6 py-10 text-center">
            <p className="text-xl font-semibold text-white">
              Completed matches will appear here once games finish.
            </p>
            <p className="scorequest-section-copy mt-3 text-sm leading-7 sm:text-base">
              Scorecards and results are preserved so teams can come back to
              the same fixture later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinishedMatch;
