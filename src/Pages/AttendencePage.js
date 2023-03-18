import React, { useState, useEffect } from "react";
import classes from "../Pages/AttendencePage.module.css";
import moment from "moment";
import Student from "../components/Student";
import { query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
const AttendencePage = () => {
  const { roomId } = useParams();
  console.log(roomId);
  //////
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const res = async () => {
      const studentsRef1 = collection(db, "COURSE_ENROLLMENT");
      // Create a query against the collection.
      const q1 = query(
        studentsRef1,
        where("roomId", "==", "nZGsv6OeOZTfx4dRvepB")
      );
      const querySnapshot1 = await getDocs(q1);
      // console.log(querySnapshot);
      const response1 = querySnapshot1.docs.map((doc) => {
        return doc.data().studentId;
      });
      // console.log(response1);
      //////////////////

      const response2 = await Promise.all(
        response1.map(async (id) => {
          const docRef = doc(db, "STUDENTS", id);
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
    };
    res();
  }, []);

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
      <div className={classes.title}>
        <div className={classes.description}>LT-20</div>
        <div className={classes.description}>I.T.-1</div>

        <div className={classes.description}>Computer Science</div>
        <div className={classes.description}>KCS-301</div>
        <div
          className={classes.description}
        >{`${selectedDate.date}-${selectedDate.getMonth}-${selectedDate.getYear}`}</div>
      </div>
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
      <div className={classes.attendence}>
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
    </div>
  );
};

export default AttendencePage;
