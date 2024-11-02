import SideBar from "./sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (!userState?.userInfo) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);
  return (
    <>
      <div className=" flex flex-row justify-between gap-10 container">
        <div className="w-[200px] overflow-hidden">
          <SideBar />
        </div>
        <div className="w-4/5 my-10 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
