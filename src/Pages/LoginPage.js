import React from "react";
import classes from "./LoginPage.module.css";
import { useState } from "react";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";
import ImageModel from "../components/ImageModel";
import { Link, useHistory } from "react-router-dom";

const LoginPage = (props) => {
    const history = useHistory();
    const handler = () => {
        console.log("Login");
        props.setRegistered(false);
      
    }
    const submitHandler = (event) => {
        event.preventDefault();
        props.setLoggedIn(true);
        history.push('/room');
         
      }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ImageModel />
        <div className={classes.Model}>
          <div className={classes.formWrapper}>
            <span className={classes.logo}>Log In</span>
            <form onSubmit={submitHandler}>
              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={person} alt="person" height="50px" />
                </span>
                <input type="text" placeholder="Username" />
              </div>
              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={pass} alt="password" height="50px" />
                </span>
                <input type="password" placeholder="Password" />
              </div>
              <span>
                Forget password ?{" "}
                <span className={classes.forget}>click here</span>
              </span>
              <button type="submit">Log In</button>
              <span>
                Not registered ?{" "}
                <Link to="/signup">
                  <span className={classes.signup} onClick={handler}>
                    sign up
                  </span>
                </Link>
              </span>
            </form>
            <div className={classes.googleLogin}>
              <img src={glogo} alt="person" height="45px" />{" "}
              <div>Sign in with Google</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
