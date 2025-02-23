import React from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderItem = ({ userState, navItem, classes, parentClass }) => {
  const location = useLocation();
  return (
    <div className={`${parentClass} flex flex-row gap-6 items-center`}>
      <ul className={`${classes} flex flex-row gap-6`}>
        {navItem.map((item, index) => (
          <li
            className={` text-natural-white  font-semibold   ${
              location.pathname === item.link && "text-secondary-goldenPoppy"
            }`}
            key={index}
          >
            <Link
              className="hover:text-secondary-goldenPoppy transition-all duration-500"
              to={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {userState.userInfo ? (
        <ul>
          <li
            className={` text-natural-white transition-all font-semibold duration-500  ${
              location.pathname === "/profile" && "text-secondary-goldenPoppy"
            }`}
          >
            <Link
              className="hover:text-secondary-goldenPoppy transition-all duration-500"
              to={"/profile"}
            >
              Profile
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li
            className={` text-natural-white font-semibold transition-all duration-500  ${
              (location.pathname === "/signup" ||
                location.pathname === "/login") &&
              "text-secondary-goldenPoppy"
            }`}
          >
            <Link
              className="hover:text-secondary-goldenPoppy transition-all duration-500"
              to={"/login"}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderItem;
