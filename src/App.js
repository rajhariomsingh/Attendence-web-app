import  { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage';
import WelcomePage from './Pages/WelcomePage';
import React, { Component } from "react";
import {NavLink, Route, Switch, useHistory, useNavigate} from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Notification from "../src/components/Notification";
import Footer from './components/Footer';
import AboutPage from './Pages/AboutPage';
import CreateRoomPage from './Pages/CreateRoomPage';
import AttendencePage from './Pages/AttendencePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
function App() {
  const history = useHistory();
  const [isShowNoti, setShowNoti] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (!isLoggedIn)
      history.push('/');
 }, [isLoggedIn]);

  return (
    <div className='appContainer'>
    <BrowserRouter>
      
      <Header setShowNoti={setShowNoti} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      {isShowNoti && <Notification setShowNoti={setShowNoti} />}
      <Switch>
      <Route path="/createroom" > <CreateRoomPage /></Route>
          <Route path="/about" ><AboutPage /></Route>
          <Route path="/login"> <LoginPage setLoggedIn={setLoggedIn}/></Route>
        <Route path="/signUp"><SignUpPage setLoggedIn={setLoggedIn}/></Route>
        <Route path="/room/:roomID"><AttendencePage /></Route>
          <Route path="/room" > <HomePage /></Route>
          <Route path="/"><WelcomePage  /></Route>

      </Switch>
      <Footer/>
  </BrowserRouter>
  </div>

    
  );
}

export default App;
