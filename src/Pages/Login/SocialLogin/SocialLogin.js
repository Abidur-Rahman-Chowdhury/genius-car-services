import React from 'react';
import google from '../../../images/social-icon/google.png';
import facebook from '../../../images/social-icon/facebook.png';
import github from '../../../images/social-icon/github.png';
import auth from '../../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';
const SocialLogin = () => {
  const [signInWithGoogle,user, error ,loading] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, error1, loading1] = useSignInWithGithub(auth);
  const [token] = useToken(user || user1);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';
  let errorElement;
  if (error || error1) {
    errorElement = <p className="text-danger text-center">{ error?.message} {error1?.message}</p>
    
  }
  if (loading || loading1) {
    return <Loading></Loading>
  }

  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-around ">
        <div style={{ height: '1px' }} className="bg-primary w-50 "></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: '1px' }} className="bg-primary w-50 "></div>
      </div>
      <div>
        {
          errorElement
        }
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-info w-50 d-block mx-auto my-2"
        >
          <img
            style={{ width: '30px' }}
            className="img-fluid"
            src={google}
            alt=""
          />
          <span className="px-2">Google Sign In</span>
        </button>
        <button className="btn btn-info w-50 d-block mx-auto my-2">
          <img className="img-fluid" src={facebook} alt="" />
          <span className="px-2">Facebook Sign In</span>
        </button>
        <button onClick={()=>signInWithGithub()} className="btn btn-info w-50 d-block mx-auto my-2">
          <img
            style={{ width: '60px' }}
            className="img-fluid"
            src={github}
            alt=""
          />
          <span className="px-2">Github Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
