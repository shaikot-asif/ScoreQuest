import React from "react";
import { toast } from "react-hot-toast";
import stables from "../../../../constants/stable";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import images from "../../../../constants/images";
import Button from "../../../../components/shared/button/Button";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
const PlayerTable = ({
  players,
  deletePlayerById = "",
  checkBox = false,
  handleSubmit,
  handleChange,
  title = "",
  buttons = true,
  closeSquad,
}) => {
  return (
    <div>
      <div>
        <h2 className="title">{title}</h2>

        <form onSubmit={handleSubmit}>
          <div />
          <div className="flex flex-row justify-between ">
            <h2 className="text-xl font-bold text-center mb-6 text-primary-darkNavy">
              Name
            </h2>
            <span className="text-xl font-bold text-center mb-6 mr-10 text-primary-darkNavy">
              {buttons ? (
                <span>Action</span>
              ) : (
                <span className="cursor-pointer" onClick={closeSquad}>
                  {" "}
                  <IoMdClose />{" "}
                </span>
              )}{" "}
            </span>
          </div>

          {players?.map((item) => (
            <div
              className="flex flex-row gap-5 justify-between shadow-md mb-5 p-3 align-middle items-center rounded-md hover:shadow-lg"
              key={item._id}
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
                  {item.firstName} {item.lastName}{" "}
                </h3>
              </div>

              <div>
                {checkBox ? (
                  <span>
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      onChange={handleChange}
                      value={item._id}
                    />
                  </span>
                ) : (
                  buttons && (
                    <div>
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
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            {checkBox && <SecondaryButton text={"Submit"} type={"submit"} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerTable;
