import React from "react";
import classes from "../components/Notification.module.css";
import close from "../assets/close.png";

const Notification = ({ setShowNoti }) => {
  return (
    <div className={classes.container}>
      <div className={classes.close} onClick={() => setShowNoti(false)}>
        <span className={classes.closeIcon}>
          <img src={close} alt="close button" />
        </span>
      </div>
      <div className={classes.notification}>
        Notification 1 this is first notification about maths class
      </div>
      <div className={classes.notification}>Notification 2</div>
      <div className={classes.notification}>Notification 3</div>
      <div className={classes.notification}>Notification 4</div>
    </div>
  );
};

export default Notification;
