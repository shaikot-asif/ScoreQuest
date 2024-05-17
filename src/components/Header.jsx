import React from "react";
import styled from "styled-components";
import images from "../constants/images";
import { Link } from "react-router-dom";

const Header = ({ searchArea = true }) => {
  return (
    <Container>
      <div className="container">
        <div className="logoArea">
          <Link to={"/"}>
            <img src={images.ScoreQuest} alt="logo" />
          </Link>
        </div>
        {searchArea && (
          <div className="searchArea">
            <input type="text" placeholder="Search match by club name" />
            <button type="button">search</button>
          </div>
        )}
        <div className="menu">
          <Link to={"/signup"}>Sign in</Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: fixed;
  top: 0;
  background: #041434;
  width: 100%;
  padding: 1rem 0px;
  .container {
    max-width: 1140px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .logoArea {
    width: 155px;
    height: 68px;
  }
  .logoArea img {
    width: 100%;
  }
  .searchArea {
    position: relative;
  }
  .searchArea input {
    width: 530px;
    height: 60px;
    border-radius: 30px;
    outline: none;
    background: inherit;
    border: 1px solid white;
    font-size: 18px;
    padding: 0 20px;
    color: white;
  }
  .searchArea input::placeholder {
    color: #c3cad9;
    font-weight: 200;
  }

  .searchArea button {
    height: 60px;
    width: 130px;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 1px solid white;
    font-size: 18px;
    padding: 0 20px;
    color: white;
    text-transform: capitalize;
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  .menu a {
    display: block;
    text-align: center;
    padding: 10px 0;
    width: 130px !important;
    height: 48px !important;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 1px solid white;
    font-size: 18px;
    color: white;
    text-transform: capitalize;
    text-decoration: none;

    cursor: pointer;
  }
`;
