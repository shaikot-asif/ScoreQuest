import { motion } from "framer-motion";
import React from "react";

const HeadingH3 = ({ text, classes }) => {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`text-center text-[22px] md:text-[28px] font-bold  text-white ${classes}`}
      >
        {text}
      </motion.h3>
    </div>
  );
};

export default HeadingH3;
