import React from "react";
import { useState } from "react";
import classes from "../components/Student.module.css";
const Student = () => {

    const [present, setPresent] = useState([]);
    const [absent, setAbsent] = useState([]);
    const presentHandler = () => {
      setPresent(['P', ...present]);
  
    }
    
    const absentHandler = () => {
      setAbsent(['A', ...absent]);
    }
    const resetHandler = () => {
        if (window.confirm("Are you Sure?")) {
            
      setPresent([]);
      setAbsent([]);
  
      }
    
    }
    console.log(present, absent);

    return (
        <tr>
            <td>2000270130062</td>
            <td>Gaurav Verma</td>
            <td>{present.map((id) => <span id={id} className={classes.pSpan}>{id}</span>)} {absent.map((id) => <span id={id} className={classes.aSpan}>{id}</span>)}</td>
            <td>
                <button className={classes.present} onClick={presentHandler}>Present</button>
                <button className={classes.absent} onClick={absentHandler}>Absent</button>
                <button className={classes.reset} onClick={resetHandler}>Reset</button>
            </td>
        </tr>);
}

export default Student;