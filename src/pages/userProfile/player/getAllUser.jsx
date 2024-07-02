import React from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../service/user";
import { useSelector } from "react-redux";
import images from "../../../constants/images";
import { useState } from "react";
import { styled } from "styled-components";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import AddMatch from "../match/components/AddMatch";

const GetAllUser = () => {
  const userState = useSelector((state) => state.user);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [userLength, setUserLength] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageChange, setPageChange] = useState();
  const [loading, setLoading] = useState(false);
  const [playMatchBtn, setPlayMatchBtn] = useState(false);
  const [requestedTeamId, setRequestedTeamId] = useState();
  const limit = 10;

  const handlePageChange = (page) => {
    setPageChange(page);
  };

  const handleClickPlayMatchBtn = ({ requestedTeam }) => {
    setRequestedTeamId(requestedTeam);
    setPlayMatchBtn(true);
  };

  useEffect(() => {
    setLoading(true);
    async function get() {
      const data = await getUsers({
        token: userState.userInfo.token,
        searchKeywords,
        limit,
        page: pageChange,
      });
      if (!data) {
        get();
      }
      setData(data);
      setLoading(false);
    }
    get();
  }, [searchKeywords, pageChange]);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      setUserLength(data?.users?.length);
      setCurrentPage(data?.page);
      setLoading(false);
    }
  }, [data, searchKeywords]);
  return (
    <div>
      <Container>
        <div>
          <Search
            placeholder="find club / area name"
            setSearchKeywords={setSearchKeywords}
          />

          <table id="table">
            <thead className="header">
              <tr>
                <td>Club / Area name</td>
              </tr>
            </thead>

            {loading ? (
              <p>Loading ...</p>
            ) : (
              users?.map(
                (item) =>
                  item._id !== userState.userInfo._id && (
                    <div key={item._id}>
                      <tbody className="items" key={item._id}>
                        <tr>
                          <td>
                            <img
                              height={50}
                              width={50}
                              src={
                                item.avatar
                                  ? stables.UPLOAD_FOLDER_BASE_URL + item.avatar
                                  : images.Profile
                              }
                              alt="img"
                            />

                            <h3>{item?.name}</h3>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>
                              <button
                                onClick={() =>
                                  handleClickPlayMatchBtn({
                                    requestedTeam: item?._id,
                                  })
                                }
                              >
                                Lets Play a match?
                              </button>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  )
              )
            )}
          </table>
          {users?.length > limit && (
            <Pagination
              limit={limit}
              totalPageCount={userLength}
              currentPage={currentPage}
              onPageChange={(page) => handlePageChange(page)}
            />
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
      </Container>
    </div>
  );
};

export default GetAllUser;

const Container = styled.div`
  width: 90%;
  margin: 3rem auto;
  position: relative;

  .title {
    text-align: center;
    padding-bottom: 20px;
  }

  #table {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    margin-top: 20px;
  }
  #table .header tr {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #041434;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin-bottom: 3px;
    font-weight: 800;
  }

  .items {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 3px;
  }

  .items tr {
    display: flex;
  }

  .items img {
    border-radius: 50px;
  }
  .items h3 {
    font-size: 16px;
  }

  .items tr td {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 15px;
  }

  .items button {
    background: inherit;
    border: none;
    color: #1565d8;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 600;
    cursor: pointer;
  }
`;
