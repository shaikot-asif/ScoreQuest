import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getPlayers } from "../../../service/player";
import { useQuery } from "@tanstack/react-query";
import images from "../../../constants/images";
import { Link } from "react-router-dom";
import stables from "../../../constants/stable";

const Squad = () => {
  const [players, setPlayers] = useState([]);
  const userState = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(false);
  const [squadPlayers, setSquadPlayers] = useState([""]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = ({ playerId }) => {
    console.log(playerId);
  };

  console.log(squadPlayers);
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () =>
      getPlayers({
        userId: userState.userInfo._id,
        token: userState.userInfo.token,
      }),
    queryKey: ["player", userState.userInfo._id],
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setPlayers([data]);
      }
    }
  }, [data, players]);

  return (
    <div>
      <Container>
        <div>
          <h2 className="title">Manage Player</h2>

          <table id="table">
            <thead className="header">
              <tr>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>

            {players?.map((item) => (
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

                      <h3>
                        {item.firstName} {item.lastName}{" "}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <input
                          type="checkbox"
                          // onChange={handleChange}
                          onChange={handleClick({ playerId: item._id })}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </div>
            ))}
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Squad;

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
  #table .header tr {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid black;
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

  .items span:nth-child(2) button {
    color: red;
    padding-right: 5px;
  }
`;
