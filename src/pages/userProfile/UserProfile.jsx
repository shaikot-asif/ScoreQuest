import MainLayout from "../../components/MainLayout";
import SideBar from "./sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (!userState?.userInfo) {
      navigate("/");
    }
  }, [userState.userInfo]);
  return (
    <MainLayout>
      <div className=" flex flex-row gap-10">
        <SideBar />

        <Outlet />
      </div>
    </MainLayout>
  );
};

export default UserProfile;
