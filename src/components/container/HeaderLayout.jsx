import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import images from "../../constants/images";
import HeaderItem from "./HeaderItem";

const navItem = [
  { name: "Home", link: "/" },
  { name: "Today Match", link: "/today-match" },
  { name: "Finished Match", link: "/finished-match" },
  { name: "Upcoming Match", link: "/upcoming-match" },
  { name: "Player Rank", link: "/player-rank" },
];

const HeaderLayout = ({ classes = "" }) => {
  const userState = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${classes} fixed inset-x-0 top-0 z-[9999] border-b border-white/10 bg-[#08111df2] px-4 py-3 shadow-[0_18px_45px_rgba(2,6,23,0.32)] backdrop-blur-xl md:px-6`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="shrink-0" onClick={() => setIsMenuOpen(false)}>
          <img
            width={150}
            loading="lazy"
            src={images.ScoreQuest}
            alt="ScoreQuest"
            className="h-auto"
          />
        </Link>

        <div className="hidden lg:block">
          <HeaderItem
            navItem={navItem}
            userState={userState}
            parentClass="flex items-center gap-4"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition duration-300 hover:border-secondary-goldenPoppy hover:text-secondary-goldenPoppy lg:hidden"
        >
          {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-7xl lg:hidden"
          >
            <div className="scorequest-glass rounded-[28px] p-4">
              <HeaderItem
                navItem={navItem}
                userState={userState}
                onNavigate={() => setIsMenuOpen(false)}
                parentClass="flex flex-col gap-4"
                classes="flex-col"
                actionClassName="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default memo(HeaderLayout);
