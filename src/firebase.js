import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfnwJnjC9Rlj8gkqdgqn_wbfYrN9ObsWw",
  authDomain: "biblios-depi.firebaseapp.com",
  projectId: "biblios-depi",
  storageBucket: "biblios-depi.firebasestorage.app",
  messagingSenderId: "521426744258",
  appId: "1:521426744258:web:6feaa0cadadc00d9eddc5b",
  measurementId: "G-MKLE93HWBY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set auth persistence (this is actually the default, but being explicit)
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const storage = getStorage(app);
export const db = getFirestore(app);