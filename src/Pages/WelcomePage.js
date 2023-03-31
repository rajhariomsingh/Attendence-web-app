import React from "react";
import classes from "./WelcomePage.module.css";
import { useState } from "react";
import teacher from "../assets/teacher.png";
import student from "../assets/student.png";
import ImageModel from "../components/ImageModel";
import { Link, Route, useNavigate } from "react-router-dom";

import { db } from "../firebase";
import {
  doc,
  addDoc,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
const WelcomePage = () => {
  document.title = "Welcome";
  const navigate = useNavigate();
  const { type, setType } = UserAuth();

  // //////
  // const id = new Date().getTime().toString();
  // console.log(id);
  // const course = async (res) => {
  //   try {
  //     const frankDocRef = collection(db, "ATTENDENCE");
  //     const ref = await addDoc(frankDocRef, {
  //       lectureId: "RdtbARNGSrk6SnJrZLzF",
  //       studentId: "9C6Ng2NFPkXrxSzyaN1SlMecDcw2",
  //       pCount: 0,
  //       aCount: 2,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // course();

  // ////////

  console.log("welcome!!!");
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ImageModel />
        <div className={classes.Model}>
          <div className={classes.buttonWrapper}>
            <div className={classes.image}>
              <img src={teacher} alt="teacher" />
            </div>
            <Link
              to="/signUp/TEACHER"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div
                className={classes.button}
                onClick={() => setType("TEACHERS")}
              >
                Teacher
              </div>
            </Link>
            <div className={classes.image}>
              <img src={student} alt="student" />
            </div>
            <Link
              to="/signUp/STUDENT"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div
                className={classes.button}
                onClick={() => setType("STUDENTS")}
              >
                Student
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
