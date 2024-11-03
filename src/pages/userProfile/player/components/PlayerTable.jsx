import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import stables from "../../../../constants/stable";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import images from "../../../../constants/images";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
const PlayerTable = ({
  players,
  deletePlayerById,
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
        <h2 className="text-2xl font-semibold text-primary-darkNavy mb-4 text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-10 ">
            <h2 className="text-xl w-[40%] font-bold text-left mb-6 text-primary-darkNavy">
              Name
            </h2>

            <span className=" w-[20%] text-xl font-bold text-center mb-6 text-primary-darkNavy">
              Role
            </span>

            <span className="text-xl w-[40%] font-bold text-right mb-6 mr-10 text-primary-darkNavy">
              {buttons ? (
                <span>Action</span>
              ) : (
                <span
                  className="cursor-pointer flex justify-end"
                  onClick={closeSquad}
                >
                  {" "}
                  <IoMdClose />{" "}
                </span>
              )}{" "}
            </span>
          </div>

          {players?.length > 0 &&
            players?.map((item) => (
              <div
                className="flex flex-row gap-5 w-full justify-between shadow-md mb-5 p-3 align-middle items-center rounded-md hover:shadow-lg"
                key={item._id}
              >
                <div className="flex w-[40%] flex-row gap-5 items-center mb-5">
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

                <div className="w-[20%] flex justify-center">
                  <p className="text-center">{item.role}</p>
                </div>

                <div className="w-[40%] flex justify-end">
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
                      <div className="flex gap-4">
                        <span className="hover:text-primary-brightOrange cursor-pointer">
                          <Link to={`/profile/update/${item._id}`}>Edit</Link>
                        </span>
                        <span
                          onClick={() => deletePlayerById(item._id)}
                          className="hover:text-primary-brightOrange cursor-pointer"
                        >
                          Delete
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
