import React from "react";

const WideNoByeRun = ({ classes, title, setByeNo, type, setTurnOff }) => {
  const runs = [0, 1, 2, 3, 4, 5, 6];

  const handelRun = (data) => {
    if (type === "wide") {
      setByeNo((prev) => ({ ...prev, wideBye: data }));
      setTurnOff(false);
    }
    if (type === "noBall") {
      setByeNo((prev) => ({ ...prev, byeScore: data, batterScore: 0 }));
      setTurnOff(false);
    }
    if (type === "noBallBatterScore") {
      setByeNo((prev) => ({ ...prev, batterScore: data, byeScore: 0 }));
      setTurnOff(false);
    }
    if (type === "bye") {
      setByeNo((prev) => ({ ...prev, byeRun: data }));
      setTurnOff(false);
    }
  };
  return (
    <div className="">
      <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
        {title}
      </h3>
      <div className=" flex gap-5 ">
        {runs.map((item) => {
          return (
            <button
              onClick={() => handelRun(item)}
              key={item}
              className={`border border-primary-brightOrange text-black hover:text-natural-white hover:bg-primary-brightOrange transition-all duration-300 ${classes} text-white h-10 w-10  flex items-center justify-center rounded-full`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WideNoByeRun;
