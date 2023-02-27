import React, { useState } from "react";
import RoomModel from "../components/RoomModel";
import classes from "../Pages/HomePage.module.css";
const HomePage = () => {
    return (
        <div className={classes.container}>
          
            <div className={classes.classRoom}>
                <RoomModel />
                <RoomModel />
                <RoomModel/>
                <RoomModel />
                <RoomModel />
                <RoomModel/>
            </div>
           
        </div>
    );

}

export default HomePage;