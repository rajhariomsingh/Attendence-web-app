import React, { useState } from "react";
import classes from "../Pages/AttendencePage.module.css";
import { Link } from "react-router-dom";
// import "react-calendar/dist/Calendar.scss";
import calendarremove from "../assets/calenderRemove.png";
import moment from 'moment';
import Student from "../components/Student";
// import "./AttendencePage.scss";
const AttendencePage = () => {
  const now = moment();
  const today = moment(`${now.year()}-${now.month() + 1}-${now.day()-2}`, 'YYYY-M-D');
  console.log(today.format('D'))
  const [selectedDate, setSelectedDate] = useState({
    date: today.format('D'),
    dayName: today.format('ddd').toUpperCase(),
    getMonth: today.format('MMM').toUpperCase(),
     getYear: today.format('Y').toUpperCase()
  });
  const dates = [];
      const Date = () => {
       
        const daysInMonth = moment().daysInMonth();
    
    
        for (let i = 1; i <= daysInMonth; i++) {
          const date = moment(`${now.year()}-${now.month() + 1}-${i}`, 'YYYY-M-D');
          dates.push({
            date: date.format('D'),
            dayName: date.format('ddd').toUpperCase(),
            getMonth: date.format('MMM').toUpperCase(),
             getYear: date.format('Y').toUpperCase()
          });
        }
    
  };
  
  Date();
  
  const selectDateHandler = (day) => {
    console.log(day);
    setSelectedDate({
     ...day
   });
  }

  return (<div className={classes.model}>
    <div className={classes.title}>
      <div className={classes.description}>LT-20</div>
      <div className={classes.description}>I.T.-1</div>
                
        <div className={classes.description}>Computer Science</div>
      <div className={classes.description}>KCS-301</div>
      <div className={classes.description}>{`${selectedDate.date} ${selectedDate.getMonth} ${selectedDate.getYear}`}</div>
      
      </div>
      <div className={classes.calender}>{dates.map((day) => {
        return (<>
          <span className={`${classes.date} ${selectedDate.date===day.date? classes.chooseDate:""}`} onClick={()=>selectDateHandler(day)}>{day.date} <br></br>{day.dayName}</span>

        </>)
      }
    )}</div>
    <div className={classes.attendence} >
      <table >
      
        <tr>
          <th>Roll No.</th>
          <th>Student Name</th>
          <th>Attendence</th>
          <th>Mark</th>
        </tr>
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
      </table>
      </div>
    </div>);
}

export default AttendencePage;