import React from "react";

const BigButton = ({ func, classes, parentClass, type = "text", text }) => {
  return (
    <div className={`${parentClass}`}>
      <button
        className={`${classes} rounded-md hover:shadow-lg w-full text-center text-xl py-5 shadow text-primary-brightOrange font-bold `}
        onClick={func}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default BigButton;
