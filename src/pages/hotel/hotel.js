import React from 'react';
import "./hotel.css";
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/header/header';
import MailList from '../../components/mailList/mailList';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tickPic from "../../img/404-tick.png"
import Payment from '../../payment';
import { useState } from "react";
import bankPic from "../../img/card_img.png"
import BookingDataService from "../../services/payment.service"


import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Hotel = ({ id, setBookingId }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [names, setNames] = useState("");
  const [accNum, setAccNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [ccv, setCCV] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });




  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (accNum === "accNum" || ccv === "ccv") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBooking = {
     names,
     accNum,
     month,
     year,
     ccv,

    };
    console.log(newBooking);

    try {
      if (id !== undefined && id !== "") {
        await BookingDataService.updateHotel(id, newBooking);
        setBookingId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookingDataService.addNewBooking(newBooking);
        setMessage({ error: false, msg: "New Booking added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

  setNames("");
  setAccNum("");
  setMonth("");
  setYear("");
  setCCV("");

  };




  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={() => setIsOpen(true)}>Reserve or Book Now!</button>
          <Payment open={isOpen} onClose={() => setIsOpen(false)}>
                <div className='popUp' id='popUp'>
                  <div class="container">

                    <form action="" onSubmit={handleSubmit}>

                      <div class="row">
                        <div class="col">
                          <h3 class="title">Payment</h3>
                          <div class="inputBox">
                            <span>cards accepted :</span>
                            <img src={bankPic} alt="" />
                          </div>

                          <div class="inputBox">
                            <span>name on card :</span>
                            <input type="text" 
                            placeholder="Names" 
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            required/>
                          </div>

                          <div class="inputBox">
                            <span>credit card number :</span>
                            <input type="number" 
                            placeholder="1111-2222-3333-4444"
                            value={accNum}
                            onChange={(e) => setAccNum(e.target.value)}
                            required/>
                          </div>

                          <div class="inputBox">
                            <span>exp month :</span>
                            <input type="text" 
                            placeholder="Month" 
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required/>
                          </div>

                          <div class="flex">
                            <div class="inputBox">
                              <span>exp year :</span>
                              <input type="number" 
                              placeholder="Year" 
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              required/>
                            </div>

                            <div class="inputBox">
                              <span>CVV :</span>
                              <input type="text" 
                              placeholder="CCV" 
                              value={ccv}
                              onChange={(e) => setCCV(e.target.value)}
                              required/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="submit" value="proceed to checkout" class="submit-btn" onClick={() => setIsOpen(false)} />
                      {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                         <div className='popUp' id='popUp'>
                              <img src={tickPic} alt="" />
                              <h2>Make Payment</h2>
                              <p>Your Reservation Has Been Successfully. Thanks!</p>
                              <button onClick={() => setIsOpen(false)}>OK</button>
                             
                              </div> 
                      </Modal> */}
                    </form>
                  </div>
                </div>
              </Payment>
          <h1 className="hotelTitle">Tower Street Apartments</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <a href="https://goo.gl/maps/v89dzVRZSuxV4cx2A">Pretoria Central</a>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over R975.00 at this property and get a free break fast & lunch meal
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from Union B in Arcadia, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Pretoria, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>R1 250.00</b> (9 nights)
              </h2>
              <button id="Reserve" onClick={() => setIsOpen(true)}>Reserve or Book Now!</button>
              <Payment open={isOpen} onClose={() => setIsOpen(false)}>
                <div className='popUp' id='popUp'>
                  <div class="container">

                    <form action="" onSubmit={handleSubmit}>

                      <div class="row">
                        <div class="col">
                          <h3 class="title">Payment</h3>
                          <div class="inputBox">
                            <span>cards accepted :</span>
                            <img src={bankPic} alt="" />
                          </div>

                          <div class="inputBox">
                            <span>name on card :</span>
                            <input type="text" 
                            placeholder="Names" 
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            required/>
                          </div>

                          <div class="inputBox">
                            <span>credit card number :</span>
                            <input type="number" 
                            placeholder="1111-2222-3333-4444"
                            value={accNum}
                            onChange={(e) => setAccNum(e.target.value)}
                            required/>
                          </div>

                          <div class="inputBox">
                            <span>exp month :</span>
                            <input type="text" 
                            placeholder="Month" 
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required/>
                          </div>

                          <div class="flex">
                            <div class="inputBox">
                              <span>exp year :</span>
                              <input type="number" 
                              placeholder="Year" 
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              required/>
                            </div>

                            <div class="inputBox">
                              <span>CVV :</span>
                              <input type="text" 
                              placeholder="CCV" 
                              value={ccv}
                              onChange={(e) => setCCV(e.target.value)}
                              required/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="submit" value="proceed to checkout" class="submit-btn" onClick={() => setIsOpen(false)} />
                      
                     
                     
                      {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                         <div className='popUp' id='popUp'>
                              <img src={tickPic} alt="" />
                              <h2>Make Payment</h2>
                              <p>Your Reservation Has Been Successfully. Thanks!</p>
                              <button onClick={() => setIsOpen(false)}>OK</button>
                             
                              </div> 
                      </Modal> */}
                    </form>
                  </div>
                </div>
              </Payment>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

{/* <div className='popUp' id='popUp'>
<img src={tickPic} alt="" />
<h2>Make Payment</h2>
<p>Your Reservation Has Been Successfully. Thanks!</p>
<button onClick={() => setIsOpen(false)}>OK</button>
{ Link to profile }
</div> */}