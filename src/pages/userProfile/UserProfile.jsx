import SideBar from "./sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!userState?.userInfo) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);
  return (
    <>
      <div
        className={`absolute right-2 top-2 text-[28px] text-primary-darkNavy lg:hidden`}
      >
        <span onClick={() => setHide(!hide)}>
          {hide ? <IoCloseOutline /> : <IoMenuOutline />}
        </span>
      </div>
      <div className=" flex flex-row justify-between">
        {hide && (
          <div
            className={`${
              hide ? "w-[210px] top-0 left-0 h-full fixed z-10 " : "w-0"
            } transition-all duration-500  shadow-lg`}
          >
            <SideBar />
          </div>
        )}
        <div className="w-[210px] hidden lg:block">
          <SideBar />
        </div>
        <div className="lg:flex-1 w-full my-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
