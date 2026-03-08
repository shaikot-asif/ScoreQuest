import React from "react";
import { Link, useLocation } from "react-router-dom";

const getNavClass = (isActive) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
    isActive
      ? "bg-secondary-goldenPoppy text-slate-950"
      : "text-slate-200 hover:bg-white/5 hover:text-white"
  }`;

const HeaderItem = ({
  userState,
  navItem,
  parentClass = "",
  classes = "",
  onNavigate = () => {},
  actionClassName = "",
}) => {
  const location = useLocation();

  return (
    <div className={`${parentClass}`}>
      <ul className={`flex gap-2 ${classes}`}>
        {navItem.map((item) => (
          <li key={item.link}>
            <Link
              to={item.link}
              onClick={onNavigate}
              className={getNavClass(location.pathname === item.link)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to={userState.userInfo ? "/profile" : "/login"}
        onClick={onNavigate}
        className={`inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-secondary-goldenPoppy hover:bg-white/5 ${actionClassName}`}
      >
        {userState.userInfo ? "Profile" : "Login"}
      </Link>
    </div>
  );
};

export default HeaderItem;
