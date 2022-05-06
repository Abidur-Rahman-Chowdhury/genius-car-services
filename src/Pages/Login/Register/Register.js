import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth'
import './Register.css'
import SocialLogin from '../SocialLogin/SocialLogin';
import useToken from '../../../hooks/useToken';
const Register = () => {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
       
        error,
      ] =useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user)
    const handelRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const agree = e.target.terms.checked;
        // if (agree) {
            
        //     createUserWithEmailAndPassword(email, password);
        // }
       await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName:name  });
        alert('Updated profile');
        


    }
    if (token) {
        navigate('/home');
    }
    return ( 
        <div className='register-form'>
            <h2 className='text-center text-primary mt-5'>Please Register</h2>
            <form onSubmit={handelRegister}>
                <input type="text" name="name" placeholder='Your Name' required />
                
                <input type="email" placeholder='Your Email' required name="email" id="" />
                
                <input type="password" placeholder='Your Password' required name="password" id="" />
                <input onClick={() => setAgree(!agree)} type="checkbox" required name="terms" id="" />
                {/* className ={agree  ? 'text-primary' : 'text-danger'} */}
                {/* className ={`px-2 ${agree ? '' : 'text-danger'}`}  */}
                <label className ={`px-2 ${agree ? '' : 'text-danger'} mb-4`}  htmlFor="terms" >Accept Genius Car Terms and Conditions</label>
                
                <input disabled ={!agree} className='w-50 mx-auto btn btn-primary text-center pb-2' type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login" className='text-danger text-decoration-none ' style={{ cursor: "pointer" }} >Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;