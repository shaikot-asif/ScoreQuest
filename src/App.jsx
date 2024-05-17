import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
