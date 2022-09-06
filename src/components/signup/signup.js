import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from "react-bootstrap"
import {useAuth} from "../../contexts/authContext"
import './signup.css';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';

function Signup() {
 
   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setPasswordConfirm] = useState("");

    const Register = () => {
        

        createUserWithEmailAndPassword(auth, email, password, confirmPassword).then(() => {
            navigator("/admin")
        }).catch((error) => {
            console.log(error)
        })


    };

    return (
        <div className="box-form">
            <div className="left">
                <div className="overlay">
                    <h1>Welcome</h1>
                    <p></p>
                    <div className="buttn">
                        <a href="#" className="facebook"><i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</a>
                        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i> Login with  Twitter  </a>
                    </div>
                </div>
            </div>


            <div className="right">
                <h5>SIGNUP</h5>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <div className="inputs" >
                    <input type="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} required />

                    <br />
                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm your password" onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </div>

                <br /><br />

               

                <br />
                <button  type="submit" onClick={Register} >SignUp</button>
            </div>

        </div>

    );
}

export default Signup;




// import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Alert } from "react-bootstrap"
// import {useAuth} from "../../contexts/authContext"
// import './signup.css';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {auth} from '../../config/firebase';

// function Signup() {
 
//   const emailRef = useRef()
//     const passwordRef = useRef()
//     const passwordConfirmRef = useRef()
//     const { signup } = useAuth()
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()



//     async function handleSubmit(e) {
//         e.preventDefault()

//         if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//             return setError('Password do not match')
//         }

//         try {
//             setError("")
//             setLoading(true)
//             await signup(emailRef.current.value, passwordRef.current.value)
         
//         } catch {
//             setError('Failed to create an account')
//         }
//         setLoading(false)
//     }

//     return (
//         <div className="box-form">
//             <div className="left">
//                 <div className="overlay">
//                     <h1>Welcome</h1>
//                     <p></p>
//                     <div className="buttn">
//                         <a href="#" className="facebook"><i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</a>
//                         <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i> Login with  Twitter  </a>
//                     </div>
//                 </div>
//             </div>


//             <div className="right">
//                 <h5>SIGNUP</h5>
//                 <p>Already have an account? <Link to="/login">Login</Link></p>
//                 {error && <Alert variant='danger'>{error}</Alert>}
//                 <form onClick={handleSubmit}>
//                 <div className="inputs" >
//                     <input type="email" placeholder="Enter your email address" ref={emailRef} required />

//                     <br />
//                     <input type="password" placeholder="Enter your password" ref={passwordRef} required />
//                     <input type="password" placeholder="Confirm your password" ref={passwordConfirmRef} required />
//                 </div>

//                 <br /><br />

               

//                 <br />
//                 <button  type="submit">SignUp</button>
//                 </form>
//             </div>

//         </div>

//     );
// }

// export default Signup;

   // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    // const { signup } = useAuth()
    // const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)
    // const navigate = useNavigate()



    // async function handleSubmit(e) {
    //     e.preventDefault()

    //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //         return setError('Password do not match')
    //     }

    //     try {
    //         setError("")
    //         setLoading(true)
    //         await signup(emailRef.current.value, passwordRef.current.value)
         
    //     } catch {
    //         setError('Failed to create an account')
    //     }
    //     setLoading(false)
    // }