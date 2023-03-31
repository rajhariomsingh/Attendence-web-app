import React from "react";
import classes from "../components/RoomModel.module.css";
import { useNavigate } from "react-router-dom";
const RoomModel = ({ room }) => {
  const navigate = useNavigate();
  // console.log(room);
  const selectRoomHandler = (id) => {
    // console.log(id, '*');
    navigate(`/room/${id}`);
  };
  return (
    <div
      className={classes.container}
      id={room.id}
      onClick={() => selectRoomHandler(room.id)}
    >
      <div className={classes.className}>
        <div>
          <h2>{room.roomName}</h2>
        </div>
        <div>
          <h2>IT-1</h2>
        </div>
      </div>
      <div className={classes.description}>
        <div className={classes.des}>
          <p>{room.subjectName}</p>
        </div>
        <div className={classes.des}>
          <p>{room.subjectCode}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomModel;
