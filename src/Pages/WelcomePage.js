import React from "react";
import classes from "./WelcomePage.module.css";
import { useState } from "react";
import teacher from "../assets/teacher.png";
import student from "../assets/student.png";
import ImageModel from "../components/ImageModel";
import { Link, Route, useHistory } from "react-router-dom";

const WelcomePage = () => {
    const history = useHistory();
    const [person, setPerson] = useState("");

    
    console.log("welcome!!!");
    console.log(person);
    return (
        <div className={classes.container}>
           <div className={classes.wrapper}>
               <ImageModel/>
                <div className={classes.Model}>
                <div className={classes.buttonWrapper}>
                        <div className={classes.image}><img src={teacher} alt="teacher" /></div>
                        <Link to='/login'><div className={classes.button} onClick={() => setPerson("Teacher")}>Teacher</div></Link>
                        <div className={classes.image}><img src={student}  alt="student" /></div>
                        <Link to='/login'><div className={classes.button} onClick={() => setPerson("Student")}>Student</div></Link>
                </div>

                </div>
            </div>
        </div>
    );
}

export default WelcomePage;