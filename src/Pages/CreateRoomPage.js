import React, { useEffect, useState } from "react";
import classes from "./CreateRoomPage.module.css";

const CreateRoomPage = () => {
  const [dayTimes, setDayTimes] = useState([]);

  const dayTimeHandler = () => {
    var daySelect = document.getElementsByName("selectDay")[0];
    var selectedDay = daySelect.value;
    var timeSelect = document.getElementsByName("selectTime")[0];
    var selectedTime = timeSelect.value;
    setDayTimes((prev) => [...prev, { day: selectedDay, time: selectedTime }]);
  };
  console.log(dayTimes);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3>Create Your Class Room</h3>
      </div>
      <form>
        <div className={classes.model}>
          <div className={classes.roomName}>
            <input type="text" placeholder="Room Name"></input>
          </div>
          <div className={classes.values}>
            <input type="text" placeholder="Branch Name"></input>

            <input type="text" placeholder="Section Name"></input>
          </div>
          <div className={classes.values}>
            <input type="text" placeholder="Subject Name"></input>

            <input type="text" placeholder="Subject Code"></input>
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
            <button
              className={classes.addButton}
              onClick={dayTimeHandler}
              type="button"
            >
              Add
            </button>
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
