import React from "react";
import classes from "../components/RoomModel.module.css";
import {  useNavigate } from "react-router-dom";
const RoomModel = ({ room }) => {
    const navigate = useNavigate();
    const selectRoomHandler = (id) => {
        // console.log(id, '*');
        navigate(`/room/${id}`);
    }
    return (
           
           <div className={classes.container} id={room.id} onClick={()=>selectRoomHandler(room.id)} >
                <div className={classes.className}><div><h2>{room.roomNo}</h2></div><div><h2>{room.section}</h2></div></div>
                <div className={classes.description}>
                    <div className={classes.des}><p>{room.subject}</p></div>
                    <div className={classes.des}><p>{room.code}</p></div>
                </div>
            </div>
        
    );
}

export default RoomModel;