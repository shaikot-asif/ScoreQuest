import React from "react";
import HeadingH3 from "../../../../components/shared/HeadingH3";

const HowToUse = () => {
  return (
    <div className="container mt-[100px] sm:mt-[150px] flex justify-center align-middle items-center flex-col m-auto ">
      <div>
        <HeadingH3 text={"How to use Score Quest"} classes={"mt-10"} />
        <p className="text-secondary-slateGray text-[16px] p-2 text-center leading-6 mb-10">
          Learn how to efficiently use Score Quest with this step-by-step guide.
          Watch the video to understand all the features and start scoring like
          a pro!
        </p>
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
