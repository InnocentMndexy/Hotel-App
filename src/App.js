import React from "react";
import './App.css';
import { AuthProvider } from "./contexts/authContext";
import {  Navigate } from "react-router-dom"


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";




import Home from '../src/pages/home/home';
import Hotel from '../src/pages/hotel/hotel';
import List from "./pages/list/list";
import Signup from '../src/components/signup/signup';
import Login from "./components/login/login";
// import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ForgotPassword from './components/forgotPassword/forgotPassword'
import Admin from "./components/admin/admin";
import AddHotels from "./components/admin/addHotels";


function App() {
  const currentUser = false;

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/signin" />
  }
  
  return (
    <Router>
     <AuthProvider>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={ <List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/addHotels" element={<AddHotels/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
      </AuthProvider>

    </Router>

  );
}

export default App;
