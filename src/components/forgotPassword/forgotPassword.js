import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/authContext';
import { Alert } from "react-bootstrap"


function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }


    return (
        <div class="box-form">
       


            <div class="right">
                <h5>Password Reset</h5>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <div class="inputs">
                    <input type="text" placeholder="Username" ref={emailRef} required/>
                   
                </div>

                <br /><br />

                <div class="remember-me--forget-password">
                    {/* <label>
                        <input type="checkbox" name="item" checked />
                        <span class="text-checkbox">Remember me</span>
                    </label> */}
                    <p><Link to="Login">Login</Link></p>
                </div>

                <br />
                <button>Reset Password</button>

                <br />
                <p>Need an account? <Link to="/signup">Sign In</Link> it takes less than a minute</p>
            </div>

        </div>
    );
}

export default ForgotPassword;