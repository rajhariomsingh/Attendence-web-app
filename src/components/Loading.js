import React from "react";
import ReactLoading from "react-loading";
import classes from "../components/Loading.module.css";
const Loading = ({ type, height, width }) => (
  <div className={classes.LoadingBack}>
    <div className={classes.Loading}>
      <ReactLoading
        type={type}
        color={"rgb(1, 72, 95)"}
        height={height}
        width={width}
      />
    </div>
  </div>
);

export default Loading;
