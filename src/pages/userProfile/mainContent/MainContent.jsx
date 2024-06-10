import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MainContent = () => {
  const useState = useSelector((state) => state.user);
  console.log(useState);
  return (
    <div>
      <div>
        <h1>Welcome {useState?.userInfo?.name}</h1>
      </div>
    </div>
  );
};

export default MainContent;
