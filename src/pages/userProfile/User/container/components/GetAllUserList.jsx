import React from "react";
import Search from "../../../../../components/Search";
import Loading from "../../../../../components/shared/Loading/Loading";
import stables from "../../../../../constants/stable";
import images from "../../../../../constants/images";
import AddMatch from "../../../match/container/components/AddMatch";

const GetAllUserList = ({
  setSearchKeywords,
  isLoading,
  user,
  userState,
  handleClickPlayMatchBtn,
  playMatchBtn,
  requestedTeamId,
  setPlayMatchBtn,
}) => {
  return (
    <div className="flex flex-col px-2 lg:p-5">
      <div className="self-center mb-10">
        <Search
          placeholder="Find club / Area name"
          setSearchKeywords={setSearchKeywords}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between ">
          <h2 className="text-xl font-bold text-center mb-6 text-natural-white">
            Club/Area Name
          </h2>
          <span className="text-xl hidden lg:block font-bold text-center mb-6 mr-10 text-natural-white">
            Action
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {user?.map(
              (item) =>
                item.id !== userState.userInfo.id && (
                  <div
                    className="flex flex-col md:flex-row gap-1 lg:gap-5 items-start md:justify-between  mb-5 p-3 md:align-middle md:items-center rounded-md text-natural-white bg-primary-midNight hover:scale-[0.99] transition-all duration-200 "
                    key={item.id}
                  >
                    <div className="flex flex-row gap-5 justify-center items-center ">
                      <img
                        className="rounded-full h-12 w-12 "
                        height={50}
                        width={50}
                        src={
                          item.avatar
                            ? stables.UPLOAD_FOLDER_BASE_URL + item.avatar
                            : images.Profile
                        }
                        alt="img"
                      />

                      <h3 className="font-bold text-xl text-secondary-goldenPoppy">
                        {item?.name?.length > 20
                          ? item?.name?.substring(0, 20) + "..."
                          : item?.name}
                      </h3>
                    </div>

                    <div>
                      <button
                        className={`hover:text-secondary-goldenPoppy hover:underline active:text-secondary-goldenPoppy `}
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
            )}
          </div>
        )}
        {user?.length === 0 && (
          <p className="text-secondary-goldenPoppy text-[28px] ">
            Nothing Found
          </p>
        )}
      </div>

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

export default GetAllUserList;
