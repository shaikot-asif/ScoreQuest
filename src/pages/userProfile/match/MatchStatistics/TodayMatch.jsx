import React, { useEffect, useState } from "react";
import HeadingH3 from "../../../../components/shared/HeadingH3";
import MatchCard from "./container/components/MatchCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTodayMatch } from "../../../../service/match";
import MainLayout from "../../../../components/MainLayout";
import Loading from "../../../../components/shared/Loading/Loading";
import Search from "../../../../components/Search";
import Header from "../../../../components/Header";

const TodayMatch = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [match, setMatch] = useState([]);
  const [pageChange, setPageChange] = useState(1);

  const limit = 10;

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["todayMatch", searchKeywords, pageChange],
    queryFn: () =>
      getTodayMatch({
        searchKeywords: searchKeywords,
        limit,
        page: pageChange,
      }),
    placeholderData: keepPreviousData,
  });

  const handelInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPageChange((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchKeywords === "") {
      setMatch([]);
    }
    if (data) {
      setMatch((prev) => [...new Set([...prev, ...data])]);
    } else if (!isFetching) {
      refetch();
    }
  }, [data, pageChange]);

  useEffect(() => {
    if (searchKeywords && data) {
      setMatch(data);
    }
    refetch();
  }, [searchKeywords, data]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {" "}
          <Header />
          <div className="container px-4 xl:px-0 block m-auto mt-10 ">
            <HeadingH3 text={"Today's Match"} classes={"mb-5"} />
            <div className="self-center mb-10 sm:w-[40%] m-auto ">
              <Search
                placeholder="Find Match By Club / Area name"
                setSearchKeywords={setSearchKeywords}
              />
            </div>

            <div className="flex flex-wrap gap-5 md:flex-row justify-center">
              {match?.map((match, index) => (
                <MatchCard
                  match={match}
                  key={index}
                  parentClass={"w-[100%] md:w-[48%] lg:w-[31%] "}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayMatch;
