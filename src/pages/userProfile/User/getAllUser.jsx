import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../service/user";
import { useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import GetAllUserList from "./container/components/GetAllUserList";

const GetAllUser = () => {
  const userState = useSelector((state) => state.user);
  const [searchKeywords, setSearchKeywords] = useState("");

  const [user, setUser] = useState([]);
  const [pageChange, setPageChange] = useState(1);
  const [playMatchBtn, setPlayMatchBtn] = useState(false);
  const [requestedTeamId, setRequestedTeamId] = useState({
    requestedTeam: "",
    requestedTeamName: "",
  });
  const limit = 4;

  const handleClickPlayMatchBtn = ({ requestedTeam, requestedTeamName }) => {
    setRequestedTeamId({
      requestedTeam: requestedTeam,
      requestedTeamName: requestedTeamName,
    });
    setPlayMatchBtn(true);
  };

  const handelInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setPageChange((prev) => prev + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      getUsers({
        token: userState.userInfo.token,
        searchKeywords,
        limit,
        page: pageChange,
        userId: userState.userInfo.id,
      }),
    queryKey: ["User", pageChange, searchKeywords],
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [pageChange, data]);

  useEffect(() => {
    if (data) {
      if (searchKeywords === "") {
        setUser((prev) => {
          const combined = [...prev, ...data];
          return combined.filter(
            (item, index) =>
              index === combined.findIndex((t) => t.id === item.id)
          );
        });
      } else {
        setUser(data);
        setPageChange(1);
      }
    }
  }, [data, searchKeywords]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);

  return (
    <GetAllUserList
      handleClickPlayMatchBtn={handleClickPlayMatchBtn}
      isLoading={isLoading}
      playMatchBtn={playMatchBtn}
      requestedTeamId={requestedTeamId}
      setPlayMatchBtn={setPlayMatchBtn}
      setSearchKeywords={setSearchKeywords}
      user={user}
      userState={userState}
    />
  );
};

export default GetAllUser;
