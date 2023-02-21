import React from "react";
import classes from "./login.module.css";
const Login = () => {
    return (
        <div className={classes.formWrapper}>
           <span className={classes.logo}>Log In</span>
            <form>
                <input type="text" placeholder="Username"/>
                <input type="text" placeholder="Password"/>
                <span>forget password ?</span>
                <button>Log In</button>
            </form>
        </div>
    );
}

export default Login;
