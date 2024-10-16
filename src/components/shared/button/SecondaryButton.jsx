import React from "react";

const SecondaryButton = ({ text }) => {
  return (
    <div>
      <button className="bg-accentColor-skyBlur px-[20px] py-[10px] rounded-[6px] font-normal text-natural-white ">
        {text}
      </button>
    </div>
  );
};

export default SecondaryButton;
