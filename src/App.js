import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import WelcomePage from "./Pages/WelcomePage";
import React, { Component } from "react";
import { BrowserRouter, NavLink, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Notification from "../src/components/Notification";
import Footer from "./components/Footer";
import AboutPage from "./Pages/AboutPage";
import CreateRoomPage from "./Pages/CreateRoomPage";
import AttendencePage from "./Pages/AttendencePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { currentUser, type } = UserAuth();
  const [isShowNoti, setShowNoti] = useState(false);
  const navigate = useNavigate();
  // console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return navigate("/login");
    }
    return children;
  };
  return (
    <div className="appContainer">
      <Header setShowNoti={setShowNoti} />
      {isShowNoti && <Notification setShowNoti={setShowNoti} />}
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="signUp" element={<WelcomePage />} />
          <Route path="/room/:roomId" element={<AttendencePage />} />
          <Route path="/createroom" element={<CreateRoomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signUp/:type" element={<SignUpPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
