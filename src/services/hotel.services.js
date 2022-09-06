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

const hotelCollectionRef = collection(db, "hotels");

class BookDataService {
  addHotels = (newHotel) => {
    return addDoc(hotelCollectionRef, newHotel);
  };

  updateHotel = (id, updatedBook) => {
    const hotelDoc = doc(db, "hotels", id);
    return updateDoc(hotelDoc, updatedBook);
  };

  deleteHotel = (id) => {
    const hotelDoc = doc(db, "hotels", id);
    return deleteDoc(hotelDoc);
  };

  getAllHotels = () => {
    return getDocs(hotelCollectionRef);
  };

  getHotel = (id) => {
    const hotelDoc = doc(db, "hotels", id);
    return getDoc(hotelDoc);
  };
}



export default new BookDataService();