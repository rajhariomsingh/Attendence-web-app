import React, { useEffect, useState } from "react";
import classes from "./CreateRoomPage.module.css";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import {
  doc,
  addDoc,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const CreateRoomPage = () => {
  document.title = "CreateRoom";
  const [loading, setLoading] = useState(false);
  const { currentUser } = UserAuth();
  console.log(currentUser?.uid);
  const navigate = useNavigate();
  const [dayTimes, setDayTimes] = useState([]);
  const [room, setRoom] = useState({
    roomName: "",
    subjectCode: "",
    subjectName: "",
    section: "",
    branchName: "",
    timing: [],
    teacherId: currentUser?.uid,
  });
  const dayTimeHandler = () => {
    var daySelect = document.getElementsByName("selectDay")[0];
    var selectedDay = daySelect.value;
    var timeSelect = document.getElementsByName("selectTime")[0];
    var selectedTime = timeSelect.value;
    setDayTimes((prev) => [...prev, { day: selectedDay, time: selectedTime }]);
  };

  const createroom = async (room) => {
    try {
      const frankDocRef = collection(db, "ROOMS");
      const ref = await addDoc(frankDocRef, {
        ...room,
        timing: [...dayTimes],
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      room.roomName === "" ||
      room.section === "" ||
      room.subjectCode === "" ||
      room.subjectName === "" ||
      room.branchName === "" ||
      dayTimes.length === 0
    ) {
      console.log("Something went wrong!!!");
      return;
    }
    createroom(room);
  };
  console.log(dayTimes);

  return (
    <div className={classes.container}>
      {loading && <Loading pos={"absolute"} />}
      <div className={classes.title}>
        <h3>Create Your Class Room</h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.model}>
          <div className={classes.roomName}>
            <input
              type="text"
              placeholder="Room Name"
              onChange={(event) =>
                setRoom((prev) => ({ ...prev, roomName: event.target.value }))
              }
            />
          </div>
          <div className={classes.values}>
            <input
              type="text"
              placeholder="Branch Name"
              onChange={(event) =>
                setRoom((prev) => ({ ...prev, branchName: event.target.value }))
              }
            ></input>

            <input
              type="text"
              placeholder="Section Name"
              onChange={(event) =>
                setRoom((prev) => ({ ...prev, section: event.target.value }))
              }
            ></input>
          </div>
          <div className={classes.values}>
            <input
              type="text"
              placeholder="Subject Name"
              onChange={(event) =>
                setRoom((prev) => ({
                  ...prev,
                  subjectName: event.target.value,
                }))
              }
            ></input>

            <input
              type="text"
              placeholder="Subject Code"
              onChange={(event) =>
                setRoom((prev) => ({
                  ...prev,
                  subjectCode: event.target.value,
                }))
              }
            ></input>
          </div>

          <div className={classes.daytime}>
            <select name="selectDay">
              <option value="MON">MON</option>
              <option value="TUE">TUE</option>
              <option value="WED">WED</option>
              <option value="THU">THU</option>
              <option value="FRI">FRI</option>
            </select>

            <select name="selectTime">
              <option value="8:30AM">8:30AM</option>
              <option value="9:20AM">9:20AM</option>
              <option value="11:00AM">11:00AM</option>
              <option value="11:50AM">11:50AM</option>
              <option value="12:40AM">12:40PM</option>
              <option value="2:20AM">2:20PM</option>
              <option value="3:10AM">3:10PM</option>
            </select>
            <span className={classes.addButton} onClick={dayTimeHandler}>
              Add
            </span>
          </div>
          <div className={classes.dayTime}>
            {dayTimes.map((dt) => (
              <span
                className={classes.addButton}
              >{`${dt.day} ${dt.time}`}</span>
            ))}
          </div>
          <div className={classes.submitButton}>
            <button className={classes.addButton}>Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomPage;
