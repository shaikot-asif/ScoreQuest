import React from "react";
import Header from "./Header";

const MainLayout = ({ children, searchArea = true }) => {
  return (
    <div>
      <Header searchArea={searchArea} />
      {children}
    </div>
  );
};

export default MainLayout;
