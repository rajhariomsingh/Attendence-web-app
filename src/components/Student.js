import React, { useEffect } from "react";
import { useState } from "react";
import classes from "../components/Student.module.css";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading";
const Student = ({ student, selectedDate, roomId }) => {
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [someChange, setSomeChange] = useState(true);
  const attendanceId = `${student.id}${selectedDate.date}${selectedDate.getMonth}${selectedDate.getYear}${roomId}`;
  console.log(attendanceId);
  const presentHandler = () => {
    setLoading(true);
    const collection = "ATTENDANCE";

    const cityRef = doc(db, collection, attendanceId);
    setDoc(
      cityRef,
      {
        present: ["P", ...present],
        absent,
        studentId: student.id,
        roomId,
        selectedDate,
      },
      { merge: true }
    ).then(setSomeChange((prev) => !prev));
  };

  const absentHandler = () => {
    setLoading(true);
    const collection = "ATTENDANCE";

    const cityRef = doc(db, collection, attendanceId);
    setDoc(
      cityRef,
      {
        absent: ["A", ...absent],
        present,
        studentId: student.id,
        roomId,
        selectedDate,
      },
      { merge: true }
    ).then(setSomeChange((prev) => !prev));
  };
  const resetHandler = () => {
    setLoading(true);
    if (window.confirm("Are you Sure?")) {
      const collection = "ATTENDANCE";

      const cityRef = doc(db, collection, attendanceId);
      setDoc(
        cityRef,
        {
          present: [],
          absent: [],
          studentId: student.id,
          roomId,
          selectedDate,
        },
        { merge: true }
      ).then(setSomeChange((prev) => !prev));
    }
  };

  useEffect(() => {
    // // Define the collection and document ID
    const collection = "ATTENDANCE";

    // // Get the document data if it exists
    // const docRef = db.collection(collection).doc(attendanceId);
    // docRef
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       // log the document data
    //       setPresent(doc.data().present);
    //       setAbsent(doc.data().absent);
    //     } else {
    //       console.log(`Document ${attendanceId} does not exist.`);
    //     }
    //   })
    //   .catch((error) => console.error(error));
    const res = async () => {
      const docRef = doc(db, collection, attendanceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPresent([...docSnap.data().present]);
        setAbsent([...docSnap.data().absent]);
      } else {
        setPresent([]);
        setAbsent([]);
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(false);
    };
    res();
  }, [someChange]);

  return (
    <tr>
      <td title={student.usename}>{student.rollNo}</td>
      {/* <td>Gaurav Verma</td> */}
      <td>{student.usename}</td>
      <td>
        {loading && <Loading type="spin" width="20px" height="20px" />}
        {!loading && (
          <span>
            {present.map((id) => (
              <span className={classes.pSpan}>{id}</span>
            ))}
          </span>
        )}
        {!loading && (
          <span>
            {absent.map((id) => (
              <span className={classes.aSpan}>{id}</span>
            ))}
          </span>
        )}
      </td>
      <td>
        <button className={classes.present} onClick={presentHandler}>
          Present
        </button>
        <button className={classes.absent} onClick={absentHandler}>
          Absent
        </button>
        <button className={classes.reset} onClick={resetHandler}>
          Reset
        </button>
      </td>
    </tr>
  );
};

export default Student;
