import React, { useEffect } from "react";
import { useState } from "react";
import classes from "../components/DisplayAttendance.module.css";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
const DisplayAttendance = ({ attend }) => {
  return (
    <tr>
      <td>{`${attend.selectedDate.date}-${attend.selectedDate.getMonth}-${attend.selectedDate.getYear}`}</td>
      <td>
        <span>
          {attend.present.map((id) => (
            <span className={classes.pSpan}>{id}</span>
          ))}
        </span>
        <span>
          {attend.absent.map((id) => (
            <span className={classes.aSpan}>{id}</span>
          ))}
        </span>
      </td>
    </tr>
  );
};

export default DisplayAttendance;
