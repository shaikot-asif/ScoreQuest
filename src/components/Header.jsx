import images from "../constants/images";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/userAction";

const navItem = [
  { name: "Home", link: "/" },
  { name: "Today Match", link: "/todayMatch" },
  { name: "Finished Match", link: "/finishedMatch" },
  { name: "Upcoming Match", link: "/upcomingMatch" },
  { name: "Statistics", link: "/playerStatistics" },
  { name: "Contact Us", link: "/contact" },
];

const Header = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div className=" bg-primary-darkNavy block m-auto py-4">
      <div className="container m-auto flex flex-row justify-between">
        <div className="">
          <Link to={"/"}>
            <img width={160} src={images.ScoreQuest} alt="logo" />
          </Link>
        </div>

        <div className="flex flex-row gap-6 items-center">
          <ul className="flex flex-row gap-6">
            {navItem.map((item, index) => (
              <li
                className={` text-natural-white transition-all font-semibold duration-500 hover:text-primary-brightOrange ${
                  location.pathname === item.link && "text-primary-brightOrange"
                }`}
                key={index}
              >
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {userState.userInfo ? (
            <ul>
              <li
                className={` text-natural-white transition-all font-semibold duration-500 hover:text-primary-brightOrange ${
                  location.pathname === "/profile" &&
                  "text-primary-brightOrange"
                }`}
              >
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange">
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li
                className={` text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                  (location.pathname === "/signup" ||
                    location.pathname === "/login") &&
                  "text-primary-brightOrange"
                }`}
              >
                <Link to={"/signup"}>Sign in</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
