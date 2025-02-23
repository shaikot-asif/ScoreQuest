import React from "react";
import { motion } from "framer-motion";

const FeaturesCard = ({
  icon,
  title,
  text,
  classes,
  y = 0,
  x = 0,
  initialX = 0,
  initialY = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: y, x: x }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      draggable
      className={`${classes} text-center rounded-md px-4 py-6 bg-secondary-cloudBrust  hover:shadow-xl transition-all duration-150 `}
    >
      <div className=" mb-3 [&>svg]:p-3 rounded-full [&>svg]:text-primary-blackRussian w-14 h-14 text-[48px] flex align-middle justify-center items-center m-auto bg-secondary-goldenPoppy">
        {icon}
      </div>
      <div>
        <h4 className="text-[18px] text-natural-white leading-[28px] font-bold text-secondary-slateGray ">
          {title}
        </h4>
        <p className="text-[16px] text-natural-white leading-[22px]  text-secondary-slateGray">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default FeaturesCard;
