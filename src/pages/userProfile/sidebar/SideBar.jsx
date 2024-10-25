import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../store/reducers/userAction";
const SideBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-primary-darkNavy w-1/6 h-screen py-10 px-9 mb-[-5rem] ">
      <ul className=" flex flex-col gap-4 ">
        <li>
          <Link
            className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
            to={"/profile"}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
            to={"squad"}
          >
            Squad
          </Link>
        </li>
        <li>
          <Link
            className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
            to={"allUsers"}
          >
            All User
          </Link>
        </li>

        <li>
          <Link
            className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
            to={"match"}
          >
            Match
          </Link>
        </li>
        <li className="dropdown" onClick={() => setShow(!show)}>
          <button className="text-natural-white flex flex-row items-center gap-3 font-semibold transition-all duration-500 hover:text-primary-brightOrange">
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
                className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
                to={"managePlayer"}
              >
                Manage Player
              </Link>
            </li>
            <li>
              <Link
                className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange"
                to={"addPlayer"}
              >
                Add Player
              </Link>
            </li>
          </ul>
        )}

        <li className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange">
          <button onClick={handleDispatch}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
