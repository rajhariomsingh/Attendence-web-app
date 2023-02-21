import React from "react";
import classes from "./WelcomePage.module.css";
import { useState } from "react";
import Login from "../components/Login";

const WelcomePage = () => {
    const [person, setPerson] = useState("");
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
                    {(person=="Teacher" ||person=="Student") && <Login/>}

                </div>
            </div>
        </div>
    );
}

export default WelcomePage;