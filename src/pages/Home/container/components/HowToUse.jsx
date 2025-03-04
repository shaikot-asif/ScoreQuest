import React from "react";
import HeadingH3 from "../../../../components/shared/HeadingH3";
import { motion } from "framer-motion";

const HowToUse = () => {
  return (
    <div className="container mt-[100px] sm:mt-[150px] flex justify-center align-middle items-center flex-col m-auto ">
      <div>
        <HeadingH3 text={"How to use Score Quest"} classes={"mt-10"} />
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          viewport={{ once: true }}
          className="text-natural-white text-[16px] p-2 text-center leading-6 mb-10"
        >
          Learn how to efficiently use Score Quest with this step-by-step guide.
          Watch the video to understand all the features and start scoring like
          a pro!
        </motion.p>
      </div>
      <div className=" p-2 md:w-[700px] md:h-[400px] ">
        <iframe
          src="https://www.youtube.com/embed/LxxDV1Rkq28"
          title="How to use Score Quest"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ border: "0", width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </div>
  );
};

export default HowToUse;
