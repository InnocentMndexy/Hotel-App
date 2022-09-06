import React, { useState, useEffect } from 'react';
import "./addHotels.css"
import BookDataService from '../../services/hotel.services';
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';
import userPic from "../../img/user.png"
import dashbardPic from "../../img/dashboard.png"
import hotelPic from "../../img/hotel.png"
import roomsPic from "../../img/rooms.png"
import visitorPic from "../../img/visitor.png"
import incomePic from "../../img/income.png"
import helpPic from "../../img/help.jpg"
import settingPic from "../../img/setting.png"
import notificationPic from "../../img/notification.png"
import { setPersistence } from 'firebase/auth';




const AddHotels = ({ id, setBookId }) => {



  const [uploadImage, setUpLoadImage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [distance, setDistance] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [features, setFeatures] = useState("");
  const [progress, setProgress] = useState(0);
  const [breakfast, setBnL] = useState("");
  const [rate, setRate] = useState("");
  const [cancelOpSubtitle, setCancelOpSubtitle] = useState("");
  const [status, setStatus] = useState("Available");
  const [price, setPrice] = useState("");
  const [include, setInclude] = useState("");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  let [hotelImage, setHotelImage] = useState("");
  const file = ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "title" || author === "author") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newHotel = {
      title,
      distance,
      subtitle,
      features,
      rate,
      cancelOpSubtitle,
      hotelImage,
      author,
      status,
      breakfast,

    };
    console.log(newHotel);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateHotel(id, newHotel);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addHotels(newHotel);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setDistance("");
    setSubtitle("");
    setFeatures("");
    setRate("");
    cancelOpSubtitle("");
    setBnL("");
    setPrice("");
    setInclude("");

  };


  const handleImage = (e) => {
    setUpLoadImage(e.target.files[0])
    uploadedImage(uploadImage)
  }

  function uploadedImage(uploadImage) {
    if (!uploadImage) return;
    const imageRef = ref(storage, `images/${uploadImage.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, uploadImage);
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
      setProgress(prog)
    }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            setHotelImage(url)
          })
      })
  }



  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getHotel(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setDistance(docSnap.data().distance);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    
      
      <div>
        <div className="side-menu">
          <div className="brand-name">
            <h1>Innocent<br /> Kunene</h1>
          </div>
          <ul>
            <li><img src={dashbardPic} alt="" />&nbsp; <span>Dashboard</span> </li>
            <li><img src={visitorPic} alt="" />&nbsp;<span>Visitors
            </span> </li>
            <li><img src={hotelPic} alt="" />&nbsp;<span>Hotels</span> </li>
            <li><img src={roomsPic} alt="" />&nbsp;<span>Rooms</span> </li>
            <li><img src={incomePic} alt="" />&nbsp;<span>Income</span> </li>
            <li><img src={helpPic} alt="" />&nbsp; <span>Help</span></li>
            <li><img src={settingPic} alt="" />&nbsp;<span>Settings</span> </li>
          </ul>
        </div>
        <div className="container">
          <div className="header">
            <div className="nav">
              <div className="search">
                <input type="text" placeholder="Search hotel.." />

              </div>
              <div className="btn-search">
                <button type="submit">Search</button>
              </div>
              <div className="user">
                
                <img src={notificationPic} alt="" />
                <div className="img-case">
                  <a href="#" ><img src={userPic} alt="" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="cards">
              <div className="card">
                <div className="box">
                  <h1>15</h1>
                  <h3>Visitors</h3>
                </div>
                <div className="icon-case">
                  <img src="students.png" alt="" />
                </div>
              </div>
              <div className="card">
                <div className="box">
                  <h1>20</h1>
                  <h3>Hotels</h3>
                </div>
                <div className="icon-case">
                  <img src="teachers.png" alt="" />
                </div>
              </div>
              <div className="card">
                <div className="box">
                  <h1>5</h1>
                  <h3>Rooms</h3>
                </div>
                <div className="icon-case">
                  <img src="schools.png" alt="" />
                </div>
              </div>
              <div className="card">
                <div className="box">
                  <h1>R 1 2500</h1>
                  <h3>Balance</h3>
                </div>
                <div className="icon-case">
                  <img src="income.png" alt="" />
                </div>
              </div>
            </div>
            <div className='dashboard'><br/><br/>
            <img src="./images/icons.jpg"/>
            <input className='dinput' type='file' onChange={handleImage} name='uploadImage' value={file} />
            {progress} %
            <div className="p-4 box">
              {message?.msg && (
                <Alert
                  variant={message?.error ? "danger" : "success"}
                  dismissible
                  onClose={() => setMessage("")}
                >
                  {message?.msg}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookTitle">Hotel Title</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Hotel Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookDistance">Distance</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Distance"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookSubTitle">Subtitle</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookFeatures">Features</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Features"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookCancelOp">Ratings</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Rate"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookCancelOpSubtitle">c</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="You can cancel later, so lock in this great price today!"
                      value={cancelOpSubtitle}
                      onChange={(e) => setCancelOpSubtitle(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group> */}

                {/* <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookBreakFastAndLuch">Breakfast and Luch</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Free breakfast and luch"
                      value={breakfast}
                      onChange={(e) => setBnL(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookHotel">Hotel Price</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Hotel Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBookHotel">
                  <InputGroup>
                    <InputGroup.Text id="formBookHotel">Includes</InputGroup.Text><br/>
                    <Form.Control
                      type="text"
                      placeholder="Including"
                      value={include}
                      onChange={(e) => setInclude(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group> */}

                <ButtonGroup aria-label="Basic example" className="mb-3">
                  <Button
                    disabled={flag}
                    variant="success"
                    onClick={(e) => {
                      setStatus("Available");
                      setFlag(true);
                    }}
                  >
                    Available
                  </Button>
                  <Button
                    variant="danger"
                    disabled={!flag}
                    onClick={(e) => {
                      setStatus("Not Available");
                      setFlag(false);
                    }}
                  >
                    Not Available
                  </Button>
                </ButtonGroup>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit">
                    Add/ Update
                  </Button>
                </div>
              </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      );

};
      export default AddHotels;