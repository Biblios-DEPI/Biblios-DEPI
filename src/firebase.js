// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional0
const firebaseConfig = {
  apiKey: "AIzaSyCfnwJnjC9Rlj8gkqdgqn_wbfYrN9ObsWw",
  authDomain: "biblios-depi.firebaseapp.com",
  projectId: "biblios-depi",
  storageBucket: "biblios-depi.firebasestorage.app",
  messagingSenderId: "521426744258",
  appId: "1:521426744258:web:6feaa0cadadc00d9eddc5b",
  measurementId: "G-MKLE93HWBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);