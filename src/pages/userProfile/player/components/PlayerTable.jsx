import React from "react";
import { toast } from "react-hot-toast";
import stables from "../../../../constants/stable";
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../../../../constants/images";
const PlayerTable = ({ players, deletePlayerById }) => {
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
                        <Link to={`/profile/update/${item._id}`}>
                          <button>Edit</button>
                        </Link>
                      </span>
                      <span>
                        <button
                          onClick={() =>
                            deletePlayerById({ playerId: item._id })
                          }
                        >
                          Delete
                        </button>
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

export default PlayerTable;

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
