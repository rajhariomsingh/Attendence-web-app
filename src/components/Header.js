import { React, useEffect, useState } from "react";
import classes from "../components/Header.module.css";
import mlogo from "../assets/menu.jpg";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { UserAuth } from "../context/AuthContext";
import logo from "../assets/favicon.png";
const Header = ({ setShowNoti }) => {
  const { currentUser, logOut, type } = UserAuth();
  console.log(type);
  const [isShowSide, setShowSide] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <h1>
          <img src={logo} alt="logo" width="40px" />
          PunctualPal
        </h1>
      </div>
      {currentUser && (
        <span className={classes.menus} onClick={() => setShowSide(true)}>
          <img src={mlogo} alt="menus" />
        </span>
      )}
      {currentUser && (
        <div
          className={`${classes.navContainer} ${
            isShowSide === true ? classes.sideBar : ""
          }`}
        >
          <div
            className={`${classes.nav} ${
              isShowSide === true ? "" : classes.none
            } ${classes.close}`}
            onClick={() => setShowSide(false)}
          >
            Close
          </div>
          <NavLink
            activeClassName={classes.navclass}
            to="/"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className={classes.nav}>Rooms</div>
          </NavLink>
          {type === "TEACHER" && (
            <NavLink
              activeClassName={classes.navclass}
              to="/createroom"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className={classes.nav}>
                <p>Create Room</p>
              </div>
            </NavLink>
          )}
          <div className={classes.nav} onClick={() => setShowNoti(true)}>
            <p>Notification</p> <span className={classes.notiCount}></span>
          </div>
          <NavLink
            activeClassName={classes.navclass}
            to="/about"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className={classes.nav}>
              <p>About</p>
            </div>
          </NavLink>
          <NavLink
            activeClassName={classes.navclass}
            to="/"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <span
              activeClassName={classes.navclass}
              className={`${classes.nav} ${classes.logout}`}
              onClick={() => logOut()}
            >
              <p>logout</p>
            </span>
          </NavLink>
        </div>
      )}
      <div className={classes.menus}></div>
    </div>
  );
};

export default Header;
