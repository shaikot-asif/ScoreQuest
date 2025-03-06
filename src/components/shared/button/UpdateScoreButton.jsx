import React from "react";

const UpdateScoreButton = ({ classes, title }) => {
  return (
    <button
      className={` border border-primary-midNight hover:scale-110 bg-primary-midNight transition-all duration-200 ${classes} text-white h-10 w-10  flex items-center justify-center rounded-full`}
    >
      {title}
    </button>
  );
};

export default UpdateScoreButton;
