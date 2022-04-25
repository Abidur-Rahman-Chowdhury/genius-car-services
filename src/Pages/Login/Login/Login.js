import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';
  const [signInWithEmailAndPassword, user,  error] =
    useSignInWithEmailAndPassword(auth);
    let errorElement;
    if (error) {
      errorElement = <p className="text-danger text-center">{ error?.message}</p>
      
    }
  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post('http://localhost:5000/login', { email });
    localStorage.setItem('accessToken', data.accessToken);
    navigate(from, { replace: true });
    console.log(email, password);
  };
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const resetPassoword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
          toast('Sent email');
    }
    else {
      toast('Please enter your email address')
    }
    
  }
  if (user) {
    // navigate(from, { replace: true });
  }
  return (
    <div className="container w-50 mx-auto">
      <h2 className="text-primary text-center mt-5">Please Login</h2>
      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
       
        {
          errorElement
        }
        <Button variant="primary"className='d-block mx-auto w-50 mb-4 ' type="submit">
          Login
        </Button>
      </Form>
      <p>
        New to Genius Car?
        <span
          className="text-primary "
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Please Register
        </span>
      </p>
      <p>
        Forget password?
        <span
          className="text-primary btn btn-link text-decoration-none "
          style={{ cursor: 'pointer' }}
          onClick={() => resetPassoword()}
        >
          Reset Password
        </span>
      </p>
      <SocialLogin></SocialLogin>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
