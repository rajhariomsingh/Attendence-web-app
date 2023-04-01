import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../Pages/LoginPage.module.css";
import person from "../assets/person.png";
import pass from "../assets/lock.png";
import glogo from "../assets/google.png";
import ImageModel from "../components/ImageModel";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { async } from "@firebase/util";
import Loading from "../components/Loading";

import { UserAuth } from "../context/AuthContext";
import Error from "../components/Error";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  document.title = "Login";
  const currentUser = UserAuth();
  const handler = () => {
    console.log("Login");
  };

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",

    pass: "",
  });
  const [err, setErr] = useState();

  const [submitdisable, setSubmitButtonDisabled] = useState(false);

  const handlesubmission = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!values.email || !values.pass) {
      setErr("auth/empty-details");
      setLoading(false);
      return;
    }
    setErr("");

    setSubmitButtonDisabled(true);
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        console.log("loggedin");
        console.log(res);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setSubmitButtonDisabled(false);
        var errorCode = err.code;
        setErr(errorCode);
        console.log(err.code);
      });
  };

  return (
    <div className={classes.container}>
      {loading && (
        <Loading type="bubbles" width="80px" height="80px" pos="absolute" />
      )}
      <div className={classes.wrapper}>
        <ImageModel />
        <div className={classes.Model}>
          <div className={classes.formWrapper}>
            <span className={classes.logo}>Log In</span>
            <form onSubmit={handlesubmission}>
              <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                  <img src={person} alt="person" height="50px" />
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

              <span>
                Forget password ?{" "}
                <span className={classes.forget}>click here</span>
              </span>

              <Error authCode={err} />
              <button disabled={submitdisable}>Log In</button>
              <span>
                Not registered ?{" "}
                <Link to="/signup">
                  <span className={classes.signup} onClick={handler}>
                    sign up
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

export default Login;
