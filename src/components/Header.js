import  {React, useEffect, useState }  from "react";
import classes from "../components/Header.module.css";
import mlogo from "../assets/menu.jpg";
import { NavLink } from "react-router-dom";
const Header = ({ setShowNoti, isLoggedIn, setLoggedIn }) => {
    const [isShowSide, setShowSide] = useState(false);
    return (
        <div className={classes.container}>
            <div className={classes.logoContainer}>
            <h1>BeOnTime</h1>
            </div>
            <span className={classes.menus} onClick={()=>setShowSide(!isShowSide)}><img src={mlogo} alt="menus"/></span>      
            {isLoggedIn && <div className={`${classes.navContainer} ${isShowSide === true ? classes.sideBar : ""}`}>
                <NavLink activeClassName={classes.navclass} to='/room'><div className={classes.nav}><p>Rooms</p></div></NavLink>
               <NavLink activeClassName={classes.navclass} to="/createroom"><div className={classes.nav}><p>Create Room</p></div></NavLink>
              <div className={classes.nav} onClick={() => setShowNoti(true)}><p>Notification</p> <span className={classes.notiCount}></span></div>
               <NavLink activeClassName={classes.navclass} to="/about"><div className={classes.nav}><p>About</p></div></NavLink>
               <NavLink activeClassName={classes.navclass} to="/home"><div activeClassName={classes.navclass} className={`${classes.nav} ${classes.logout}`} onClick={()=> setLoggedIn(false)}><p>logout</p></div></NavLink>
                
            </div>}
           
 
            <div className={classes.menus}></div>
        </div>
    );

}

export default Header;