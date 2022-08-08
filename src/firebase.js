import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const fireBaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDOVkIPpxDcrGTaid84PVFH4GuCouHPwTg",
  authDomain: "todo-app-b2518.firebaseapp.com",
  databaseURL: "https://todo-app-b2518-default-rtdb.firebaseio.com/",
  projectId: "todo-app-b2518",
  storageBucket: "todo-app-b2518.appspot.com",
  messagingSenderId: "837671810972",
  appId: "1:837671810972:web:78c2222a5688f19241ba59",
  measurementId: "G-20JJ5Y9XT6",
});

const db = fireBaseApp.firestore();

export default db;
