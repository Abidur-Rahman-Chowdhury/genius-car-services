import { Toast } from 'bootstrap';
import React from 'react';

import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequiredAuth = ({ children }) => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const handelSendEmail = async () => {
        await sendEmailVerification();
          toast('Sent email');
    }
    const [user,loading] = useAuthState(auth);
    let location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to='/login' state ={{from:location}} replace></Navigate>
    }
    if (!user.emailVerified) {
        return <div>
            <h3 className='text-danger'>Your Email is not Verified!!</h3>
            <h5 className='text-success'>Please Verify Email</h5>

            <button className='btn btn-primary' onClick={handelSendEmail} >Send Verify Email </button>
            <ToastContainer></ToastContainer>
        </div>
    }
    return children;
};

export default RequiredAuth;