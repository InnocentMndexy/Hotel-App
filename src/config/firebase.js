import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcqyf8zRgT49QcEaq3k5yyJtBRacmNVFw",
  authDomain: "hotel-booking-app-5de50.firebaseapp.com",
  projectId: "hotel-booking-app-5de50",
  storageBucket: "hotel-booking-app-5de50.appspot.com",
  messagingSenderId: "475946229795",
  appId: "1:475946229795:web:730e8dd151186a790a9196",
  measurementId: "G-JPWEYM8PSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);
const storage = getStorage(app);

const analytics = getAnalytics(app);




export {auth, storage};