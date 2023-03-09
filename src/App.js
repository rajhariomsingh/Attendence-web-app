import  { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage';
import WelcomePage from './Pages/WelcomePage';
import React, { Component } from "react";
import { NavLink,  useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Notification from "../src/components/Notification";
import Footer from './components/Footer';
import AboutPage from './Pages/AboutPage';
import CreateRoomPage from './Pages/CreateRoomPage';
import AttendencePage from './Pages/AttendencePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

function App() {
  const navigate = useNavigate();
  const [isShowNoti, setShowNoti] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn)
      navigate('/');
 }, [isLoggedIn]);

  return (
    <div className='appContainer'>
  
      <Header setShowNoti={setShowNoti} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      {isShowNoti && <Notification setShowNoti={setShowNoti} />}
      <Routes>
          <Route path="/createroom" element={<CreateRoomPage />}/> 
          <Route path="/about"  element={<AboutPage />}/>
          <Route path="/login"   element={ <LoginPage setLoggedIn={setLoggedIn}/>}/>
        <Route path="/signUp"   element={<SignUpPage setLoggedIn={setLoggedIn}/>}/>
        <Route path="/room/:roomID" element={<AttendencePage />}/>
          <Route path="/room"  element={ <HomePage />}/>
          <Route path="/"    element={<WelcomePage  />}/>
        </Routes>
       
      <Footer/>
  
  </div>

    
  );
}

export default App;
