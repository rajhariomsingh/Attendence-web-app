import React, { useState, useEffect } from "react";
import classes from "../Pages/AttendencePage.module.css";
import moment from "moment";
import Student from "../components/Student";
import { query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import DisplayAttendance from "../components/DisplayAttendance";
import Loading from "../components/Loading";
const AttendencePage = () => {
  document.title = "Attendance";
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const { currentUser, type, setPresent, setAbsent } = UserAuth();
  console.log(currentUser, type);
  console.log(roomId);
  const [room, setRoom] = useState({
    branchName: "",
    roomName: "",
    section: "",
    subjectCode: "",
    subjectName: "",
    teacherId: "",
  });
  const [totalAttend, setTotalAttend] = useState([]);
  //////
  const [students, setStudents] = useState([]);
  const [totalP, setTotalP] = useState(0);
  const [totalA, setTotalA] = useState(0);

  useEffect(() => {
    setTotalA(0);
    setTotalP(0);
    setLoading(true);

    const attendance = async () => {
      const roomsRef = collection(db, "ATTENDANCE");
      // Create a query against the collection.
      const q = query(
        roomsRef,
        where("studentId", "==", currentUser?.uid),
        where("roomId", "==", roomId)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const response = querySnapshot.docs.map((doc) => {
        setTotalA((prev) => prev + doc.data().absent.length);
        setTotalP((prev) => prev + doc.data().present.length);
        return { ...doc.data(), id: doc.id };
      });
      setTotalAttend([...response]);
      setLoading(false);
      console.log(totalAttend);
    };

    const res = async () => {
      const studentsRef1 = collection(db, "COURSE_ENROLLMENT");
      // Create a query against the collection.
      const q1 = query(studentsRef1, where("roomId", "==", roomId));
      const querySnapshot1 = await getDocs(q1);
      // console.log(querySnapshot);
      const response1 = querySnapshot1.docs.map((doc) => {
        return doc.data().studentId;
      });
      // console.log(response1);
      //////////////////

      const response2 = await Promise.all(
        response1.map(async (id) => {
          const docRef = doc(db, "USER", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
      );

      setStudents(response2);
      setLoading(false);
    };
    if (type === "STUDENT") attendance();
    else res();

    const roomdata = async () => {
      const result = doc(db, "ROOMS", roomId);
      const docSnap4 = await getDoc(result);
      console.log(docSnap4.data());
      setRoom({ ...docSnap4.data() });
    };
    roomdata();
  }, []);
  // setPresent((prev) => prev + totalP);
  // setAbsent((prev) => prev + totalA);
  console.log(totalA, totalP);
  console.log(students);
  //////

  const now = moment();
  const today = moment(
    `${now.year()}-${now.month() + 1}-${now.day() - 2}`,
    "YYYY-M-D"
  );

  const [selectedDate, setSelectedDate] = useState({
    date: today.format("DD"),
    dayName: today.format("ddd").toUpperCase(),
    getMonth: today.format("MM").toUpperCase(),
    getYear: today.format("Y").toUpperCase(),
  });
  const dates = [];
  const Date = () => {
    const daysInMonth = moment().daysInMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(`${now.year()}-${now.month() + 1}-${i}`, "YYYY-M-D");
      dates.push({
        date: date.format("DD"),
        dayName: date.format("ddd").toUpperCase(),
        getMonth: date.format("MM").toUpperCase(),
        getYear: date.format("Y").toUpperCase(),
      });
    }
  };

  Date();

  const selectDateHandler = (day) => {
    // console.log(day);
    setSelectedDate({
      ...day,
    });
  };
  const attendanceId = `${selectedDate.date}${selectedDate.getMonth}${selectedDate.getYear}${roomId}`;
  return (
    <div className={classes.model}>
      {loading && <Loading type="bubbles" width="80px" height="80px" />}
      <div className={classes.title}>
        <div className={classes.description}>{room.roomName}</div>
        <div className={classes.description}>{room.section}</div>

        <div className={classes.description}>{room.subjectName}</div>
        <div className={classes.description}>{room.subjectCode}</div>
        {type === "TEACHER" && (
          <div
            className={classes.description}
          >{`${selectedDate.date}-${selectedDate.getMonth}-${selectedDate.getYear}`}</div>
        )}
        {type === "TEACHER" && <div className={classes.roomId}>{roomId}</div>}
        {type === "STUDENT" && (
          <div className={classes.roomId}>{`Total Lecture: ${
            totalA + totalP
          }  Present: ${totalP}`}</div>
        )}
      </div>
      {type === "TEACHER" && (
        <div className={classes.calender}>
          {dates.map((day) => {
            return (
              <>
                <span
                  className={`${classes.date} ${
                    selectedDate.date === day.date ? classes.chooseDate : ""
                  }`}
                  onClick={() => selectDateHandler(day)}
                >
                  {day.date} <br></br>
                  {day.dayName}
                </span>
              </>
            );
          })}
        </div>
      )}
      {type === "TEACHER" && (
        <div className={`${classes.attendence} ${classes.mobile}`}>
          <table>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Attendence</th>
              <th>Mark</th>
            </tr>
            {students.map((student) => (
              <Student
                student={student}
                key={`${student.id}${attendanceId}`}
                roomId={roomId}
                selectedDate={selectedDate}
              />
            ))}
          </table>
        </div>
      )}
      {type == "STUDENT" && (
        <div className={classes.attendence}>
          <table>
            <tr>
              <th>Date</th>
              <th>Attendence</th>
            </tr>
            {totalAttend.map((attend) => (
              <DisplayAttendance key={attend.id} attend={attend} />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendencePage;
