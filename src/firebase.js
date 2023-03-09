import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBjeuhmqfpDwUZVOyzIsd2adb7CcglF-OU",
  authDomain: "attendence-web.firebaseapp.com",
  projectId: "attendence-web",
  storageBucket: "attendence-web.appspot.com",
  messagingSenderId: "731358841868",
  appId: "1:731358841868:web:639fd05e27d99864ed3229",
  measurementId: "G-C4X4VK1KZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };