import React from "react";
import classes from "../components/Error.module.css";
const Error = ({ authCode }) => {
  switch (authCode) {
    case "auth/wrong-password":
      return <b className={classes.error}>Wrong password.</b>;

    case "auth/invalid-email":
      return <b className={classes.error}>Invalid email.</b>;
    case "auth/weak-password":
      return (
        <b className={classes.error}>
          Password should be at least 6 characters.
        </b>
      );

    case "auth/user-not-found":
      return <b className={classes.error}>User not found.</b>;
    case "auth/empty-details":
      return <b className={classes.error}>Please fill all details.</b>;

    case "auth/email-already-in-use":
      return <b className={classes.error}>Already registered.</b>;

    // Many more authCode mapping here...

    default:
      return "";
  }
};

export default Error;
