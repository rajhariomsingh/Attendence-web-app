import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [type, setType] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const logOut = () => {
    console.log("log out");
    signOut(auth);
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      console.log(user);

      const docRef = await doc(db, "USER", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setType(docSnap.data().type);
        console.log(type);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logOut,
        setType,
        type,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

export const UserAuth = () => {
  return useContext(AuthContext);
};
