import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserPen } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../store/reducers/userAction";
import images from "../../../constants/images";
const SideBar = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDispatch = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-primary-midNight w-[210px] fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  h-screen py-10 px-9 z-20 ">
      <div className="flex flex-col gap-4">
        <div>
          <a href="/">
            <img
              className="w-[120px]"
              src={images.ScoreQuest}
              alt="Scorequest"
            />
          </a>
        </div>
        <ul className=" flex flex-col gap-4 ">
          <li className="">
            <Link
              className={`text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center gap-2 items-center text-center rounded-md py-2 ${
                location.pathname === "/profile" &&
                "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black "
              }`}
              to={"/profile"}
            >
              <FaUserPen size={20} />
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={`text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center gap-2 text-center rounded-md py-2 ${
                location.pathname === "/profile/squad" &&
                "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black"
              }`}
              to={"squad"}
            >
              <FaUsers size={20} />
              Squad
            </Link>
          </li>
          <li className="text-center">
            <Link
              className={`text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center gap-2 text-center rounded-md py-2 ${
                location.pathname === "/profile/allUsers" &&
                "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black"
              }`}
              to={"allUsers"}
            >
              <PiMicrosoftTeamsLogoFill size={20} />
              Teams
            </Link>
          </li>

          <li>
            <Link
              className={`text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center gap-2 text-center rounded-md py-2 ${
                location.pathname === "/profile/match" &&
                "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black"
              }`}
              to={"match"}
            >
              <TbListDetails size={20} />
              Match
            </Link>
          </li>
          <li
            className="text-center w-full block"
            onClick={() => setShow(!show)}
          >
            <button className="text-natural-white flex flex-row items-center justify-center gap-3 font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full text-center rounded-md py-2">
              <GiBabyfootPlayers size={20} />
              Player
              {show ? (
                <span>
                  <IoIosArrowUp />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown />
                </span>
              )}
            </button>
          </li>
          {show && (
            <ul className="flex flex-col gap-4 pl-5">
              <li>
                <Link
                  className={`text-natural-white text-[14px] font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center text-center rounded-md py-2 ${
                    location.pathname === "/profile/managePlayer" &&
                    "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black"
                  }`}
                  to={"managePlayer"}
                >
                  <MdManageAccounts size={20} />
                  Manage Player
                </Link>
              </li>
              <li>
                <Link
                  className={`text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full flex justify-center gap-2 text-center rounded-md py-2 ${
                    location.pathname === "/profile/addPlayer" &&
                    "bg-secondary-goldenPoppy hover:!bg-secondary-goldenPoppy !text-black"
                  }`}
                  to={"addPlayer"}
                >
                  <IoIosPersonAdd size={20} />
                  Add Player
                </Link>
              </li>
            </ul>
          )}

          <li className="text-natural-white font-normal transition-all duration-500 hover:bg-secondary-cloudBrust hover:scale-110 cursor-default w-full block text-center rounded-md py-2">
            <button
              className="flex justify-center gap-2 items-center w-full cursor-default"
              onClick={handleDispatch}
            >
              {" "}
              <MdLogout size={20} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
