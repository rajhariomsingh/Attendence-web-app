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
function App() {
  const history = useHistory();
  const [isShowNoti, setShowNoti] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (!isLoggedIn)
      history.push('/home');
 }, [isLoggedIn]);

  return (
    <BrowserRouter>

      <Header setShowNoti={setShowNoti} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      {isShowNoti && <Notification setShowNoti={setShowNoti} />}
      <Switch>
      <Route path="/room" > <HomePage /></Route>
      <Route path="/createroom" > <CreateRoomPage /></Route>
      <Route path="/about" ><AboutPage /></Route>
        <Route path="/"><WelcomePage setLoggedIn={setLoggedIn} /></Route>
        <Route path="*"><div>
          <h1>404</h1>
          <h5>Page not found.<NavLink to='home'>go to HomePage</NavLink></h5>
        </div></Route>
      </Switch>
      <Footer/>
  </BrowserRouter>
   
  );
}

export default App;
