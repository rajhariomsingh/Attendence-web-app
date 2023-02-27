import React from "react";
import classes from "../components/Notification.module.css";

const Notification = ({setShowNoti}) => {
    return (<div className={classes.container}>
        <div className={classes.close} onClick={()=>setShowNoti(false)}><h1>Close</h1></div>
        <div className={classes.notification}>Notification 1 this is first notification about maths class</div>
        <div className={classes.notification}>Notification 2</div>
        <div className={classes.notification}>Notification 3</div>
        <div className={classes.notification}>Notification 4</div>
    </div>);
}

export default Notification;