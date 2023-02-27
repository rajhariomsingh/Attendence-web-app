import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./SignUp.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";


const SignUp = (props) => {
  const history = useHistory();
  const handler = () => {
    console.log("SignUp");
  
    props.setRegistered(true);
   
  }
  const submitHandler = (event) => {
    event.preventDefault();
    props.setLoggedIn(true);
    history.push('/room');
  }
    return (
      <div className={classes.formWrapper}>
        <span className={classes.logo}>Sign Up</span>
            <form onSubmit={submitHandler}>
                <div className={classes.inputWrapper}><span className={classes.icons}><img src={person} alt="person" height="50px" /></span><input type="text" placeholder="Username"/></div>
          <div className={classes.inputWrapper}><span className={classes.icons}><img src={pass} alt="password" height="50px" /></span><input type="password" placeholder="Password" /></div>
          <div className={classes.name}><div><input type="text" placeholder="First name"  /></div> <div> <input type="text" placeholder="Last name" /></div></div>
                <button type='submit'>Register</button>
                <span>Already registered ? <Link to='/login'><span className={classes.signup} onClick={handler}>Login In</span></Link></span>
            </form >
            <div className={classes.googleLogin}><img src={glogo} alt="person" height="45px" /> <div >Sign in with Google</div></div>
      </div>
    );
}

export default SignUp;