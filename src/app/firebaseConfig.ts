import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMcuAiYZGMHoJtg43Sqj4ap9Q4Aeibj9s",
  authDomain: "prj-music-app.firebaseapp.com",
  databaseURL: "https://prj-music-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prj-music-app",
  storageBucket: "prj-music-app.appspot.com",
  messagingSenderId: "970632288138",
  appId: "1:970632288138:web:f20bb3422aee00ae8a9a73"
};

const app = initializeApp(firebaseConfig);
const dbFirebase = getDatabase(app);
const authFirebase = getAuth(app);

export { dbFirebase, authFirebase };