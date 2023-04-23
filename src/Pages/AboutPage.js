import React from "react";
import classes from "./AboutPage.module.css";
import Dip2 from "../assets/Dip2.jpg";
import faz from "../assets/faz.jpeg";
import gau from "../assets/gau.jpeg";
import hari from "../assets/hari.jpeg";
import git from "../assets/gitLogo.gif";
import insta from "../assets/instaLogo.gif";
import link from "../assets/linkedlinLogo.gif";
const AboutPage = () => {
  document.title = "About";
  return (
    <div className={classes.main}>
      <br />
      <h2>OUR AIM</h2>
      <div className={classes.desc}>
        <b>
          The aim of the PunctualPal attendance management web app is to provide
          a reliable and user-friendly platform for schools and universities to
          manage and track their students' attendance. The web app will allow
          students to mark their attendance, view their schedules, and receive
          notifications related to their attendance. Teachers will be able to
          monitor their classes' attendance, generate reports on attendance
          data, and communicate with students and parents about
          attendance-related matters. The use of ReactJS and Firebase will
          enable the creation of a responsive and scalable web app that can
          handle large amounts of data and provide real-time updates to users.
          Ultimately, the goal of PunctualPal is to improve attendance tracking
          and management in educational institutions, leading to increased
          academic success for students.
        </b>
      </div>
      <br />
      <h2>Our Team</h2>
      <div className={classes.container}>
        <span className={classes.profileContainer}>
          <img src={gau} className={classes.img1}></img>
          <h2>Gaurav Verma</h2>
          <span className={classes.logo}>
            <a href="https://www.instagram.com/gvverma1/" target="blank">
              <img src={insta} width="50px" />
            </a>
          </span>
          <span className={classes.logo}>
            <a href="https://github.com/Gaurav3646" target="blank">
              <img src={git} width="49px" />
            </a>
          </span>
          <span className={classes.logo}>
            <a
              href=" https://in.linkedin.com/in/gaurav-verma-866057221"
              target="blank"
            >
              <img src={link} width="53px" />
            </a>
          </span>
        </span>
        <span className={classes.profileContainer}>
          <img src={hari} className={classes.img1}></img>
          <h2>Hariom Singh Rajput</h2>
          <span className={classes.logo}>
            <a href="https://instagram.com/hariomsingh_12" target="blank">
              <img src={insta} width="50px" />
            </a>
          </span>
          <span className={classes.logo}>
            <a href="https://github.com/rajhariomsingh" target="blank">
              <img src={git} width="49px" />
            </a>
          </span>
          <span className={classes.logo}>
            <a
              href="https://www.linkedin.com/in/hariom-singh-3693841ba"
              target="blank"
            >
              <img src={link} width="53px" />
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

export default AboutPage;
