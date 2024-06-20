import React from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
import MainContent from "./mainContent/MainContent";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (!userState?.userInfo) {
      navigate("/");
    }
  }, [userState.userInfo]);
  return (
    <div>
      <Header />
      <Container>
        <div className="menuAndContent">
          <div className="sideMenu">
            <SideBar />
          </div>
          <div className="menuContent">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;

const Container = styled.div`
  margin-top: 101px;
  .menuAndContent {
    display: flex;
    height: 83.3vh;
  }
  .sideMenu {
    background: #041434;
    width: 20%;
    padding-left: 4rem;
  }
  .menuContent {
    width: 80%;
    overflow: auto;
  }
`;
