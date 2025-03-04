import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  const userState = useSelector((state) => state.user);
  return (
    <div className="container block m-auto mt-[100px] sm:mt-[150px] ">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        className="bg-primary-midNight mx-5 lg:mx-auto lg:w-[70%] rounded-md px-2 py-4 lg:px-5 lg:py-10 "
      >
        <h3 className="text-natural-white text-[22px]  md:text-[28px] leading-[38px] md:leading-[48px] mt-8 text-center ">
          Ready to Transform Your Cricket Experience?
        </h3>
        <div className="flex gap-6 flex-col md:flex-row items-center justify-center my-8">
          {!userState.userInfo && (
            <Link to={"/signup"}>
              <PrimaryButton text={"Sign Up For free"} />
            </Link>
          )}
          <Link to={"/today-match"}>
            <SecondaryButton text={"Today Match"} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;
