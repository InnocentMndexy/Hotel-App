import "./searchItem.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import BookDataService from "../../services/hotel.services";

const SearchItem = ({ getHotelId }) => {


  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    getHotel();
  }, []);

  const getHotel = async () => {
    const data = await BookDataService.getAllHotels();
    console.log(data.docs);
    setHotel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      {hotel.map((doc, index) => {
        return (
          <div className="searchItem">


            <img
              src={doc.hotelImage}
              alt=""
              className="siImg"
            />
            <div className="siDesc">

              <h1 className="siTitle">{doc.title}</h1>
              <span className="siDistance">{doc.distance}</span>
              <span className="siTaxiOp">Free airport taxi</span>
              <span className="siSubtitle">
                Studio Apartment with Air conditioning
              </span>
              <span className="siFeatures">{doc.features}</span> 
              {/* Entire studio • 1 bathroom • 21m² 1 full bed */}
              <span className="siCancelOp">Free cancellation </span>
              <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
              </span>
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>Excellent</span>
                <button>{doc.rate}</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">{doc.price}</span>
                <span className="siTaxOp">Includes breakfast and luch</span>


                <Link to="hotel">
                  <button className="siCheckButton">See availability</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}


    </div>






  );
};

export default SearchItem;

