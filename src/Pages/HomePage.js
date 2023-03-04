import React, { useState } from "react";
import RoomModel from "../components/RoomModel";
import classes from "../Pages/HomePage.module.css";
import { rooms } from "../roomsData";

const HomePage = () => {
   
    return (
        <div className={classes.container}>
          
            <div className={classes.classRoom}>
                {rooms.map((room) => <RoomModel room={room} id={room.id}  />)}
            </div>
           
        </div>
    );

}

export default HomePage;