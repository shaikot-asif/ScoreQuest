import React from "react";
import styled from "styled-components";
import images from "../constants/images";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/userAction";

const Header = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <div className="container">
        <div className="logoArea">
          <Link to={"/"}>
            <img src={images.ScoreQuest} alt="logo" />
          </Link>
        </div>

        <div className="menu">
          {userState.userInfo ? (
            <ul>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/signup"}>Sign in</Link>
              </li>
            </ul>
          )}
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
    max-width: 1240px;
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

  .menu ul {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    gap: 1rem;
  }

  .menu button {
    display: block;
    text-align: center;
    padding: 10px 0;
    width: 130px !important;
    height: 48px !important;

    outline: none;
    background: transparent;
    border: none;
    font-size: 18px;
    color: white;
    text-transform: capitalize;
    text-decoration: none;

    cursor: pointer;
  }
`;
