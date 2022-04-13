import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {

    const handelRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        

   }
    return ( 
        <div className='register-form'>
            <h2 className='text-center text-primary mt-5'>Please Register</h2>
            <form onSubmit={handelRegister}>
                <input type="text" name="name" placeholder='Your Name' required />
                
                <input type="email" placeholder='Your Email' required name="email" id="" />
                
                <input type="password" placeholder='Your Password' required name="password" id="" />
                
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login" className='text-danger text-decoration-none ' style={{ cursor: "pointer" }} >Login</Link></p>
        </div>
    );
};

export default Register;