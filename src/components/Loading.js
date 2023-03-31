import React from "react";
import ReactLoading from "react-loading";
import classes from "../components/Loading.module.css";
const Loading = () => (
  <div className={classes.LoadingBack}>
    <div className={classes.Loading}>
      <ReactLoading
        type="bubbles"
        color={"rgb(1, 72, 95)"}
        height={"80px"}
        width={"80px"}
      />
    </div>
  </div>
);

export default Loading;
