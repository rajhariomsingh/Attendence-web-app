import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";

const Login = (props)=> {
    const handler = () => {
        console.log("Login");
        props.setRegistered(false);
    }

    const navigate = useNavigate();
    const [values, setValues] = useState({
      email: "",
      
      pass: "",
  
    });
    const[errorMsg, setErrorMsg] = useState("");
  
  
    const[submitdisable, setSubmitButtonDisabled] = useState(false);

    const handlesubmission = () =>{
        if(!values.email||  !values.pass){
          setErrorMsg("FILL ALL DETAILS");
          return;
        }
        setErrorMsg("");
    
        setSubmitButtonDisabled(true);
         console.log(values);
        signInWithEmailAndPassword(auth, values.email , values.pass).then( async (res)=>{
          setSubmitButtonDisabled(false);
          
          navigate("/");
          console.log("loggedin");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          console.log(err.message);
        });
      };

    return (
        <div className={classes.formWrapper}>
           <span className={classes.logo}>Log In</span>
            <form>
                <div className={classes.inputWrapper}><span className={classes.icons}><img src={person} alt="person" height="50px" /></span><input type="text" placeholder="email"
                 onChange={event=>setValues((prev)=> ({...prev, email: event.target.value}))
                }/></div>

                <div className={classes.inputWrapper}><span className={classes.icons}><img src={pass} alt="password" height="50px"/></span><input type="password" placeholder="Password"
                 onChange={event=>setValues((prev)=> ({...prev, pass: event.target.value}))
                }/></div>

                <span>Forget password ? <span className={classes.forget}>click here</span></span>
                <b className={classes.error}>{errorMsg}</b>
                <button disabled={submitdisable} onClick={handlesubmission}>Log In</button>
                <span>Not registered ? <span className={classes.signup} onClick={handler}>sign up</span></span>
            </form>
            <div className={classes.googleLogin}><img src={glogo} alt="person" height="45px" /> <div >Sign in with Google</div></div>
        </div>
    );
}

export default Login;
