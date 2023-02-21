import React from "react";
import classes from "./login.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";
const Login = (props)=> {
    const handler = () => {
        console.log("Login");
        props.setRegistered(false);
    }
    return (
        <div className={classes.formWrapper}>
           <span className={classes.logo}>Log In</span>
            <form>
                <div className={classes.inputWrapper}><span className={classes.icons}><img src={person} alt="person" height="50px" /></span><input type="text" placeholder="Username"/></div>
                <div className={classes.inputWrapper}><span className={classes.icons}><img src={pass} alt="password" height="50px"/></span><input type="password" placeholder="Password"/></div>
                <span>Forget password ? <span className={classes.forget}>click here</span></span>
                <button>Log In</button>
                <span>Not registered ? <span className={classes.signup} onClick={handler}>sign up</span></span>
            </form>
            <div className={classes.googleLogin}><img src={glogo} alt="person" height="45px" /> <div >Sign in with Google</div></div>
        </div>
    );
}

export default Login;
