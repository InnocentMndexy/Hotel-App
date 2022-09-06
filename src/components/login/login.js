import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from '../../contexts/authContext'
import { Alert } from "react-bootstrap"
import './login.css';
import { useAuth } from "../../contexts/authContext"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';



function Login() {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
  
    const handleLogin = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth,email, password).then((userCredential) =>{
            const user = userCredential.user;
            console.log(user)
             navigate("/hotels")
        })
        .catch((error) => {
            setError(true)
        });

    };

    return (
        <div class="box-form">
            <div class="left">
                <div class="overlay">
                    <h1>Welcome</h1>
                    <p></p>
                    <div class="buttn">
                        <a href="#" class="facebook"><i class="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</a>
                        <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i> Login with  Twitter  </a>
                    </div>
                </div>
            </div>


            <div class="right">

                <h5>LOGIN</h5>
                <p>Don't have an account? <Link to="/signup">Create Your Account</Link> it takes less than a minute</p>

                {error && <span>Wrong email or Password!</span>}
                <form onSubmit={handleLogin}>
                    <div class="inputs">
                        <input type="email" placeholder="Username" onChange={e=>setEmail(e.target.value)} required />
                        <br />
                        <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required />
                    </div>

                    <br /><br />

                    <div class="remember-me--forget-password">
                        <label>
                            <input type="checkbox" name="item" checked />
                            <span class="text-checkbox">Remember me</span>
                        </label>
                        <p><Link to="/forgot-password">forget password?</Link></p>
                    </div>

                    <br />
                    <Link to={"/"}><button type="submit" >Login</button></Link>
                   
                    
                </form>
            </div>

        </div>
    );
}

export default Login;