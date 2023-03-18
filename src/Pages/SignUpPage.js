import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../Pages/SignUpPage.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import mail from "../assets/maillogo.png";
import glogo from "../assets/google.png";
import ImageModel from "../components/ImageModel";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";
import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [submitdisable, setSubmitButtonDisabled] = useState(false);
  const handler = () => {
    console.log("SignUp");
    props.setRegistered(true);
  };
  const handlesubmission = () => {
    if (!values.username || !values.email || !values.pass) {
      setErrorMsg("FILL ALL DETAILS");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        // await updateProfile(user, {
        //   displayName: values.username,
        // });
        props.setLoggedIn(true);

        const frankDocRef = doc(db, "STUDENTS", res.user.uid);
        await setDoc(frankDocRef, {
          usename: values.username,
          email: values.email,
        });
        console.log(user);
        navigate("/room");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        console.log(err.message);
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ImageModel />
        <div className={classes.Model}>
          <div className={classes.formWrapper}>
            <span className={classes.logo}>Sign Up</span>
            <form>
              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={person} alt="person" height="50px" />
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </div>

              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={pass} alt="password" height="50px" />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                />
              </div>

              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={mail} alt="mail" height="50px" />
                </span>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              {/* <div className={classes.name}><input type="text" placeholder="First name"  /> <input type="text" placeholder="Last name" /></div> */}

              <b className={classes.error}>{errorMsg}</b>
              <button
                className={classes.button}
                onClick={handlesubmission}
                disabled={submitdisable}
              >
                Sign up
              </button>
              <span>
                Already registered ?{" "}
                <Link to="/login">
                  <span className={classes.signup} onClick={handler}>
                    Login In
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

export default SignUp;
