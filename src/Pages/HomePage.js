import React, { useEffect, useState } from "react";
import RoomModel from "../components/RoomModel";
import classes from "../Pages/HomePage.module.css";
import Header from "../components/Header";
import { query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { UserAuth } from "../context/AuthContext";
import BasicExample from "../components/Loading";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useLocation } from "react-router-dom";
const HomePage = () => {
  document.title = "Room";
  const { currentUser, type } = UserAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("joinId") ?? "";

  console.log(type);
  const [loading, setLoading] = useState(false);
  const [joinId, setJoinId] = useState(id);
  const [newJoin, setNewJoin] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [err, setErr] = useState("");
  // const [percent, setPercent] = useState(0);
  //////
  useEffect(() => {
    const resRoom = async () => {
      setAbsent(0);
      setPresent(0);
      const studentsRef1 = collection(db, "COURSE_ENROLLMENT");
      // Create a query against the collection.
      const q1 = query(studentsRef1, where("studentId", "==", currentUser.uid));
      const querySnapshot1 = await getDocs(q1);
      // console.log(querySnapshot);
      const response1 = querySnapshot1.docs.map((doc) => {
        return doc.data().roomId;
      });
      // console.log(response1);
      //////////////////

      const response2 = await Promise.all(
        response1.map(async (id) => {
          const docRef = doc(db, "ROOMS", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const attend = collection(db, "ATTENDANCE");
            // Create a query against the collection.
            const q3 = query(
              attend,
              where("studentId", "==", currentUser.uid),
              where("roomId", "==", docSnap.id)
            );
            const querySnapshot2 = await getDocs(q3);
            console.log(querySnapshot2);
            querySnapshot2.docs.forEach((doc) => {
              console.log(doc.data(), doc.data());
              setPresent((prev) => prev + doc.data().present.length);
              setAbsent((prev) => prev + doc.data().absent.length);
            });
            return { ...docSnap.data(), id: docSnap.id };
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
      );
      setRooms([...response2]);
      setLoading(false);
    };
    /////

    const res = async () => {
      const roomsRef = collection(db, "ROOMS");
      // Create a query against the collection.
      const q = query(roomsRef, where("teacherId", "==", currentUser?.uid));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const response = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setRooms([...response]);
      console.log(rooms);
      setLoading(false);
    };

    ////

    if (type === "STUDENT") {
      setLoading(true);
      resRoom();
    } else {
      setLoading(true);
      res();
    }
  }, [newJoin]);

  /////
  const joinRoomHandler = async () => {
    if (joinId === "") {
      setErr("join/empty-details");
    }

    const result = doc(db, "ROOMS", joinId);
    const docSnap4 = await getDoc(result);

    if (!docSnap4.exists()) {
      setErr("join/not-found");
      console.log("No such document!");
      return;
    }

    const exist = rooms.find((room) => room.id === joinId);
    if (exist) {
      setErr("join/already-joined");
      return;
    }
    try {
      const frankDocRef = collection(db, "COURSE_ENROLLMENT");
      const ref = await addDoc(frankDocRef, {
        roomId: joinId,
        studentId: currentUser?.uid,
      });
      setNewJoin((prev) => !prev);
      setJoinId("");
    } catch (err) {
      console.log(err.message);
    }
  };
  const changeHandler = (e) => {
    // console.log(e.target.value);
    setJoinId(() => e.target.value);
  };
  console.log(joinId);
  console.log(present, absent);

  let percent = (present / (present + absent)) * 100;
  if (present + absent === 0) percent = 0;

  return (
    <>
      {type === "STUDENT" && (
        <div className={classes.attendanceData}>
          <div className={classes.joinRoom}>
            <input type="text" value={joinId} onChange={changeHandler} />
            <span onClick={joinRoomHandler}>Join Room</span>
          </div>
          <Error authCode={err} />
          <div className={classes.dataContainer}>
            <span className={classes.data}>{`Total Lecture: ${
              present + absent
            } `}</span>{" "}
            <span className={classes.data}>{`  Present: ${present}`}</span>
            <span
              className={classes.data}
            >{`Attendance Percentage: ${percent.toFixed(2)}`}</span>
          </div>
        </div>
      )}
      <div className={classes.container}>
        {loading && <Loading type="bubbles" width="80px" height="80px" />}
        <div className={classes.classRoom}>
          {rooms.map((room) => (
            <RoomModel room={room} key={room.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
