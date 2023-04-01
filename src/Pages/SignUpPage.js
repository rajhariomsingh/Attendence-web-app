import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { doc, setDoc, setLogLevel, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import rollNo from "../assets/id-card.png";
import Loading from "../components/Loading";
import Error from "../components/Error";

const SignUp = () => {
  document.title = "SignUp";
  const [loading, setLoading] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    pass: "",
    rollNo: "",
  });
  const [err, setErr] = useState("");

  const [submitdisable, setSubmitButtonDisabled] = useState(false);

  const handler = () => {
    console.log("SignUp");
  };
  const handlesubmission = (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      (type === "TEACHER" &&
        (!values.username || !values.email || !values.pass)) ||
      (type === "STUDENT" &&
        (!values.username || !values.email || !values.pass || !values.rollNo))
    ) {
      setErr("auth/empty-details");
      setLoading(false);
      return;
    }
    setErr("");

    setSubmitButtonDisabled(true);
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        // await updateProfile(user, {
        //   displayName: values.username,
        // });

        const frankDocRef = doc(db, "USER", res.user.uid);
        if (type === "STUDENT")
          await setDoc(frankDocRef, {
            usename: values.username,
            email: values.email,
            type,
            rollNo: values.rollNo,
          });
        else
          await setDoc(frankDocRef, {
            usename: values.username,
            email: values.email,
            type,
          });
        console.log(user);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setSubmitButtonDisabled(false);
        setErr(err.code);
        console.log(err.message);
      });
  };
  return (
    <div className={classes.container}>
      {loading && <Loading />}
      <div className={classes.wrapper}>
        <ImageModel />
        <div className={classes.Model}>
          <div className={classes.formWrapper}>
            <span className={classes.logo}>Sign Up</span>
            <form onSubmit={handlesubmission}>
              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={person} alt="person" height="50px" />
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </div>
              {type === "STUDENT" && (
                <div className={classes.inputWrapper}>
                  <span className={classes.icons}>
                    <img src={rollNo} alt="rollNo" height="37px" />
                  </span>
                  <input
                    type="text"
                    placeholder="Roll no."
                    onChange={(event) =>
                      setValues((prev) => ({
                        ...prev,
                        rollNo: event.target.value,
                      }))
                    }
                  />
                </div>
              )}
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

              {/* <div className={classes.name}><input type="text" placeholder="First name"  /> <input type="text" placeholder="Last name" /></div> */}

              <Error authCode={err} />
              <button className={classes.button} disabled={submitdisable}>
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
            {/* <div className={classes.googleLogin}>
              <img src={glogo} alt="person" height="45px" />{" "}
              <div>Sign in with Google</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
