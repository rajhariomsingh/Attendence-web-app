import React from "react";
import classes from "./WelcomePage.module.css";
import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const WelcomePage = () => {
    const [person, setPerson] = useState("");
    const [isRegistered, setRegistered] = useState("true");

    console.log(person);
    return (
        <div className={classes.container}>
           <div className={classes.wrapper}>
                <div className={classes.AttendImage}>
                </div>
                <div className={classes.Model}>
                    {person == "" && <div className={classes.buttonWrapper}>
                        <div className={classes.button} onClick={() => setPerson("Teacher")}>Teacher</div>
                        <div className={classes.button} onClick={() => setPerson("Student")}>Student</div>
                    </div>
                    }
                    {isRegistered && (person == "Teacher" || person == "Student") && <Login setRegistered = {setRegistered} />}
                    {!isRegistered && (person == "Teacher" || person == "Student") &&  <SignUp setRegistered ={setRegistered}/>}

                </div>
            </div>
        </div>
    );
}

export default WelcomePage;