import React, { useState } from "react";
import styled from "styled-components";
import images from "../../../../constants/images";
import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../../../../service/player";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import stables from "../../../../constants/stable";
import { Link } from "react-router-dom";

const ManagePlayer = () => {
  const userState = useSelector((state) => state.user);

  const [players, setPlayers] = useState();

  console.log(stables, stables);

  const { data, isPending, error, isLoading } = useQuery({
    queryFn: async () =>
      await getPlayers({
        userId: userState.userInfo._id,
      }),
    queryKey: ["player"],
  });

  useEffect(() => {
    // toast.error(error);
    setPlayers(data);
  }, [data]);

  console.log("data: ", players, isLoading);

  if (!players) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <div>
        <h2 className="title">Manage Player</h2>

        <table id="table">
          <tr className="header">
            <thead>Name</thead>
            <thead>Action</thead>
          </tr>

          {isLoading ? (
            <div className="loading">loading...</div>
          ) : (
            <div>
              {players.map((item) => (
                <tr className="items">
                  <tbody>
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

                    {console.log(stables.UPLOAD_FOLDER_BASE_URL + item.avatar)}

                    <h3>
                      {item.firstName} {item.lastName}{" "}
                    </h3>
                  </tbody>
                  <tbody>
                    <span>
                      <Link to={`/profile/update/${item._id}`}>
                        <button>Edit</button>
                      </Link>
                    </span>
                    <span>
                      <button>Delete</button>
                    </span>
                  </tbody>
                </tr>
              ))}
            </div>
          )}
        </table>
      </div>
    </Container>
  );
};

export default ManagePlayer;

const Container = styled.div`
  width: 90%;
  margin: 5rem auto;

  .title {
    text-align: center;
    padding-bottom: 20px;
  }

  #table {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
  }
  #table .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid black;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin-bottom: 3px;
    font-weight: 800;
  }

  tr.items {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 3px;
  }

  .items tbody img {
    border-radius: 50px;
  }
  .items h3 {
    font-size: 16px;
  }

  .items tbody {
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

  .items tbody span:nth-child(2) button {
    color: red;
    padding-right: 5px;
  }
`;
