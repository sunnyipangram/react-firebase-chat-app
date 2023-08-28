// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVIH8abVoJeUkyCZcpDGG1Nt0uxuuyaN4",
  authDomain: "chat-application-e17ce.firebaseapp.com",
  projectId: "chat-application-e17ce",
  storageBucket: "chat-application-e17ce.appspot.com",
  messagingSenderId: "111563787956",
  appId: "1:111563787956:web:f55d4f5a2809330d9b11e1",
  measurementId: "G-LCLDTM06JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)