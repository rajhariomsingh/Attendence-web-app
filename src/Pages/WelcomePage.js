import React from "react";
import classes from "./WelcomePage.module.css";
import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import teacher from "../assets/teacher.png";
import student from "../assets/student.png";
import { Link, Route, useHistory } from "react-router-dom";

const WelcomePage = ({ setLoggedIn }) => {
    const history = useHistory();
    const [person, setPerson] = useState("");

    
    console.log("welcome!!!");
    console.log(person);
    return (
        <div className={classes.container}>
           <div className={classes.wrapper}>
                <div className={classes.AttendImage}>
                </div>
                <div className={classes.Model}>
                   <Route path="/home" exact><div className={classes.buttonWrapper}>
                        <div className={classes.image}><img src={teacher} alt="teacher" /></div>
                        <Link to='/login'><div className={classes.button} onClick={() => setPerson("Teacher")}>Teacher</div></Link>
                        <div className={classes.image}><img src={student}  alt="student" /></div>
                        <Link to='/login'><div className={classes.button} onClick={() => setPerson("Student")}>Student</div></Link>
                    </div>
                    </Route> 
                 <Route path='/login'><Login  setLoggedIn={setLoggedIn} /></Route>
                   <Route path='/signup'><SignUp  setLoggedIn={setLoggedIn}/></Route>

                </div>
            </div>
        </div>
    );
}

export default WelcomePage;