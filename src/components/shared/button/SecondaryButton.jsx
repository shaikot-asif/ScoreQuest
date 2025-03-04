import React from "react";
import { motion } from "framer-motion";

const SecondaryButton = ({
  text,
  classes,
  type = "text",
  isDisabled = false,
  func,
  data,
  y = 50,
}) => {
  return (
    <div>
      <motion.button
        initial={{ opacity: 0, y: y }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        disabled={isDisabled}
        type={type}
        className={`${classes} ${
          isDisabled && "cursor-not-allowed"
        } border-secondary-goldenPoppy border hover:bg-secondary-goldenPoppy transition-all duration-200 hover:text-primary-blackRussian  px-[20px] py-[10px] rounded-[6px] font-normal text-natural-white`}
      >
        {text}
      </motion.button>
    </div>
  );
};

export default SecondaryButton;
