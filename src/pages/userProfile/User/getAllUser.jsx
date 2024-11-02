import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../service/user";
import { useSelector } from "react-redux";
import images from "../../../constants/images";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";

import stables from "../../../constants/stable";
import Loading from "../../../components/shared/Loading/Loading";
import AddMatch from "../match/container/components/AddMatch";

const GetAllUser = () => {
  const userState = useSelector((state) => state.user);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [userLength, setUserLength] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageChange, setPageChange] = useState(1);
  const [playMatchBtn, setPlayMatchBtn] = useState(false);
  const [requestedTeamId, setRequestedTeamId] = useState({
    requestedTeam: "",
    requestedTeamName: "",
  });
  const limit = 2;

  const handlePageChange = (page) => {
    console.log(page, "page");
    setPageChange(page);
  };

  const handleClickPlayMatchBtn = ({ requestedTeam, requestedTeamName }) => {
    setRequestedTeamId({
      requestedTeam: requestedTeam,
      requestedTeamName: requestedTeamName,
    });
    setPlayMatchBtn(true);
  };

  const { data, isLoading, refetch } = useQuery({
    queryFn: useCallback(() => {
      return getUsers({
        token: userState.userInfo.token,
        searchKeywords,
        limit,
        page: pageChange,
        userId: userState.userInfo.id,
      });
    }, [pageChange, userState, limit, searchKeywords]),
    queryKey: ["User"],
  });

  useEffect(() => {
    refetch();
  }, [refetch, pageChange, searchKeywords]);

  if (!data) {
    refetch();
  }

  useEffect(() => {
    if (data) {
      setUserLength(data?.users?.length);
      setCurrentPage(data?.page);
    }
  }, [data]);
  return (
    <div className="flex flex-col">
      <div className="self-center mb-10">
        <Search
          placeholder="Find club / Area name"
          setSearchKeywords={setSearchKeywords}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between ">
          <h2 className="text-xl font-bold text-center mb-6 text-primary-darkNavy">
            Club/Area Name
          </h2>
          <span className="text-xl font-bold text-center mb-6 mr-10 text-primary-darkNavy">
            Action
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          data?.users?.map(
            (item) =>
              item.id !== userState.userInfo.id && (
                <div
                  className="flex flex-row gap-5 justify-between shadow-md mb-5 p-3 align-middle items-center rounded-md hover:shadow-lg"
                  key={item.id}
                >
                  <div className="flex flex-row gap-5 justify-center items-center mb-5">
                    <img
                      className="rounded-full"
                      height={50}
                      width={50}
                      src={
                        item.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL + item.avatar
                          : images.Profile
                      }
                      alt="img"
                    />

                    <h3 className="font-bold text-xl text-primary-brightOrange">
                      {item?.name}
                    </h3>
                  </div>

                  <div>
                    <button
                      className={`hover:text-primary-brightOrange active:text-primary-darkNavy `}
                      onClick={() =>
                        handleClickPlayMatchBtn({
                          requestedTeam: item?.id,
                          requestedTeamName: item?.name,
                        })
                      }
                    >
                      Lets Play a match?
                    </button>
                  </div>
                </div>
              )
          )
        )}
        {data?.users?.length === 0 && (
          <p className="text-primary-brightOrange text-[28px] ">
            Nothing Found
          </p>
        )}
      </div>

      <Pagination
        limit={limit}
        totalPageCount={userLength}
        currentPage={currentPage}
        onPageChange={(page) => handlePageChange(page)}
      />

      <div>
        {playMatchBtn && (
          <AddMatch
            requestedTeam={requestedTeamId}
            setPlayMatchBtn={setPlayMatchBtn}
          />
        )}
      </div>
    </div>
  );
};

export default GetAllUser;
