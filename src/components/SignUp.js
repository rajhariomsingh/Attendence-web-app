import React from "react";
import classes from "./SignUp.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";
const SignUp = (props) => {

  const handler = () => {
    console.log("SignUp");
    props.setRegistered(true);

  }
    return (
      <div className={classes.formWrapper}>
        <span className={classes.logo}>Sign Up</span>
            <form>
                <div className={classes.inputWrapper}><span className={classes.icons}><img src={person} alt="person" height="50px" /></span><input type="text" placeholder="Username"/></div>
          <div className={classes.inputWrapper}><span className={classes.icons}><img src={pass} alt="password" height="50px" /></span><input type="password" placeholder="Password" /></div>
          <div className={classes.name}><input type="text" placeholder="First name"  /> <input type="text" placeholder="Last name" /></div>
                <button>Log In</button>
                <span>Already registered ? <span className={classes.signup} onClick={handler}>Login In</span></span>
            </form>
            <div className={classes.googleLogin}><img src={glogo} alt="person" height="45px" /> <div >Sign in with Google</div></div>
      </div>
    );
}

export default SignUp;