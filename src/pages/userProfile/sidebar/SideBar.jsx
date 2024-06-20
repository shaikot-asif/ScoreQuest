import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useState } from "react";
import { useEffect } from "react";
const SideBar = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Container>
        <ul className="menu">
          <li>
            <Link to={"/profile"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"#"}>Notification</Link>
          </li>
          <li>
            <Link to={"#"}>Match</Link>
          </li>
          <li className="dropdown" onClick={() => setShow(!show)}>
            <button>
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
            <ul className="dropdownContent">
              <li>
                <Link to={"managePlayer"}>Manage Player</Link>
              </li>
              <li>
                <Link to={"addPlayer"}>Add Player</Link>
              </li>
            </ul>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default SideBar;

const Container = styled.div`
  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 5rem;
    font-size: 18px;
  }

  .dropdown button {
    font-family: sans-serif;
    background: inherit;
    outline: none;
    border: none;
    text-align: left;
    color: white;
    font-size: 18px;
    display: flex;
    color: white;
    text-align: center;
    gap: 8px;
    font-size: 18px;
    cursor: pointer;
    font-weight: 700;
  }

  .dropdownContent {
    margin-left: 20px;
    transition-delay: 1s;
    transition-duration: 1ms;
  }
  .dropdown span {
    margin-top: 3px;
  }
  .menu li {
    list-style: none;
    cursor: pointer;
    font-size: 18px;
  }
  .menu li a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
`;
