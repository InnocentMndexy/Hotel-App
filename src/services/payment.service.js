import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const bookingCollectionRef = collection(db, "booking");

class BookingDataService {
  addNewBooking= (newBooking) => {
    return addDoc(bookingCollectionRef, newBooking);
  };

  deleteBooking = (id) => {
    const bookingDoc = doc(db, "booking", id);
    return deleteDoc(bookingDoc);
  };

  getAllBookings= () => {
    return getDocs(bookingCollectionRef);
  };

  getBooking = (id) => {
    const bookingDoc = doc(db, "booking", id);
    return getDoc(bookingDoc);
  };
}

export default new BookingDataService();