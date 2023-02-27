import React from "react";
import classes from "../components/RoomModel.module.css";
const RoomModel = () => {
    return (
        <div className={classes.container}>
            <div className={classes.className}><div><h2>LT-20</h2></div><div><h2>IT-1</h2></div></div>
            <div className={classes.description}>
            <div className={classes.des}><p>Computer Science</p></div>
                <div className={classes.des}><p>KCS306</p></div>
            </div>
        </div>
    );
}

export default RoomModel;