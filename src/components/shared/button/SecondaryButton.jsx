import React from "react";

const SecondaryButton = ({ text }) => {
  return (
    <div>
      <button className="bg-accentColor-skyBlur hover:[box-shadow:0px_5px_15px_rgba(255,_255,_255)] px-[20px] py-[10px] rounded-[6px] font-normal text-natural-white ">
        {text}
      </button>
    </div>
  );
};

export default SecondaryButton;
