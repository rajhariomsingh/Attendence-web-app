import React, { useEffect, useState } from "react";
import RoomModel from "../components/RoomModel";
import classes from "../Pages/HomePage.module.css";

import { query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { async } from "@firebase/util";
const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const res = async () => {
      const roomsRef = collection(db, "ROOMS");
      // Create a query against the collection.
      const q = query(
        roomsRef,
        where("teacherId", "==", "Fy2KfMmldEfJ5hykR223vwHgS672")
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const response = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setRooms([...response]);
      console.log(rooms);
    };
    res();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.classRoom}>
        {rooms.map((room) => (
          <RoomModel room={room} id={room.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
