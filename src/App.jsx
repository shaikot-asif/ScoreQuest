import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/userProfile/UserProfile";
import MainContent from "./pages/userProfile/mainContent/MainContent";
import ManagePlayer from "./pages/userProfile/player/manage/ManagePlayer";
import AddPlayer from "./pages/userProfile/player/addPlayer/AddPlayer";
import UpdatePlayer from "./pages/userProfile/player/manage/update/UpdatePlayer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />}>
          <Route index element={<MainContent />} />
          <Route path="addPlayer" element={<AddPlayer />} />
          <Route path="managePlayer" element={<ManagePlayer />} />
          <Route path="update/:playerId" element={<UpdatePlayer />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
