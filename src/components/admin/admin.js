import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../../services/hotel.services";
import userPic from "../../img/user.png"
import dashbardPic from "../../img/dashboard.png"
import hotelPic from "../../img/hotel.png"
import roomsPic from "../../img/rooms.png"
import visitorPic from "../../img/visitor.png"
import incomePic from "../../img/income.png"
import helpPic from "../../img/help.jpg"
import settingPic from "../../img/setting.png"
import notificationPic from "../../img/notification.png"

import "./admin.css"
import { Link } from "react-router-dom";


const Admin = ({ getHotelId }) => {

    const [hotel, setHotel] = useState([]);
    useEffect(() => {
        getHotel();
    }, []);

    const getHotel = async () => {
        const data = await BookDataService.getAllHotels();
        console.log(data.docs);
        setHotel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getHotel();
    };

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
                            <Link to="/addHotels" className="btn">Add New Hotel</Link>
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
                    <div className="content-2">
                        <div className="recent-payments">
                            <div className="title">
                                <h2>Hotels List</h2>
                                <Button className="btn" onClick={getHotel}>
                                    Refresh List
                                </Button>
                            </div>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        {/* <th>Number of Rooms</th> */}
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotel.map((doc, index) => {
                                        return (
                                            <tr key={doc.id}>
                                                <td>{index + 1}</td>
                                                <td>{doc.title}</td>
                                                <td>{doc.author}</td>
                                                <td>{doc.distance}</td>
                                                <td>{doc.status}</td>
                                                <td>
                                                    <Button
                                                        variant="secondary"
                                                        className="edit"
                                                        onClick={(e) => getHotelId(doc.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        className="delete"
                                                        onClick={(e) => deleteHandler(doc.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <div className="new-students">
                            <div className="title">
                                <h2>Visitors</h2>
                                <a href="#" className="btn">View All</a>
                            </div>
                            <table>
                                <tr>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>option</th>
                                </tr>
                                <tr>
                                    <td><img src="user.png" alt="" /></td>
                                    <td>Sthembiso Mndebele</td>
                                    <td><img src="info.png" alt="" /></td>
                                </tr>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Admin;