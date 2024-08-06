import React, { useState } from 'react';
import { login, signup, getProfile } from '../services/Api';
import { jwtDecode } from 'jwt-decode';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import Profile from '../components/Profile';

import '../css/Signup.css';

const SignupAndLogin = ({ token, setToken, admin, setRole, setProfile, setResponse, setTabIndex }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    signup(email, username, password)
      .then(response => {
        setResponse('Signup successful. Please log in.');
        setIsSignup(false);
      })
      .catch(error => {
        console.error('Error signing up', error);
        setResponse(error.response.data);
      });
  };

  const handleLogin = () => {
    login(username, password)
      .then(response => {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        setToken(token);
        setRole(decodedToken.isAdmin);
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', decodedToken.isAdmin);

        getProfile(token)
          .then(profileResponse => {
            setProfile(profileResponse.data);
            localStorage.setItem('profile', JSON.stringify(profileResponse.data));
            setResponse('Login successful');
            setTabIndex(0)
          })
          .catch(profileError => {
            console.error('Error fetching profile', profileError);
            setResponse('Login successful but failed to fetch profile');
          });
      })
      .catch(error => {
        console.log('Error logging in', error);
        setResponse(error.response.data);
      });
  };

  const handleLogout = () => {
    setToken('');
    setRole(false);
    setProfile({});
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('profile');
    setResponse('Logged out');
    setTabIndex(0); // Reset to first tab (e.g., home or login tab)
  };

  return (
    <>
    {!token &&
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src="https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj"
                  style={{ width: '185px', borderRadius: "50%" }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">Welcome</h4>
              </div>

              <p>{!isSignup ? 'Please login to your account' : 'Signup to get started' }</p>

              {isSignup && <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e) => setEmail(e.target.value)} />}
              <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username' onChange={(e) => setUsername(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)}/>

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={isSignup ? handleSignup : handleLogin}>{isSignup ? 'Sign up' : 'Sign in'}</MDBBtn>
                <a className="text-muted" href="#!">Forgot password?</a>
              </div>

              {!isSignup ? 
                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Don't have an account?</p>
                  <MDBBtn outline className='mx-2' color='danger' onClick={() => setIsSignup(!isSignup)}>
                    Sign Up
                  </MDBBtn>
                </div> : 
                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Already have an account?</p>
                  <MDBBtn outline className='mx-2' color='danger' onClick={() => setIsSignup(!isSignup)}>
                    Login
                  </MDBBtn>
                </div>}
            </div>
          </MDBCol>

          {!isSignup ? (
            <>
              <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Why should you login?</h4>
                    <p class="small mb-0">Logging in maybe reveal some features or pages that non-users can not interact with.
                    </p>
                  </div>
                </div>
              </MDBCol>
            </>
          ) : (
            <>
              <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Why should you signup?</h4>
                    <p class="small mb-0">When signning up at deebehygh.com, your information is not shared/sold to data brokers or
                     other 3rd parties looking to obtain personal information. Any and all content stays within over databases untouched by staff or the owner.
                     Should there be any reason for your account to get terminated, you'll be noticed beforehand via email or your preffered contact method. 
                     Persons 13 and under may not register. Anyone found underage, will be banned and terminated from accessing deebehygh.com.
                     Please note that the site is still under development so maybe features or buttons may not work as intended. </p>
                  </div>
                </div>
              </MDBCol>
            </>
          )}
        </MDBRow>
      </MDBContainer> }
      {token &&
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src="https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj"
                  style={{ width: '185px', borderRadius: "50%" }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">Logging Out</h4>
              </div>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Are you sure you want to log out?</p>
                  <MDBBtn outline className='mx-2' color='danger' onClick={handleLogout}>
                    Logout
                  </MDBBtn>
                </div> 
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer> }
    </>
  )

  /*return (
    <div className='loginform'>
      {!token ? (
        <div>
          <h1>{isSignup ? 'Signup' : 'Login'}</h1>
          {isSignup && <><p>Email</p>
          <input
            type="text"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </>}
          <p>Username</p>
          <input
            className='usern'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Password</p>
          <input
            className='passwd'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='loginInst' onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up now!'}
          </p>
          <button onClick={isSignup ? handleSignup : handleLogin}>
            {isSignup ? 'Signup' : 'Login'}
          </button>
          
        </div>
      ) : (
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
          <p>You are about to log out. Are you sure you want to log out?</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );*/
}

export default SignupAndLogin;