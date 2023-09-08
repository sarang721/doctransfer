
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACeu5JKETUErK_49dUXGrlOYaDmkBnHr8",
  authDomain: "doctransfer-cde52.firebaseapp.com",
  projectId: "doctransfer-cde52",
  storageBucket: "doctransfer-cde52.appspot.com",
  messagingSenderId: "7573292277",
  appId: "1:7573292277:web:b7e89151b7ef5cbf8f71bc",
  measurementId: "G-71EDHC9P7C"
};


const firebase = initializeApp(firebaseConfig);

const auth=getAuth(firebase);
const db=getFirestore(firebase);


const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export {auth,registerWithEmailAndPassword,signInWithEmailAndPassword,db,firebase};




