import React, { useState } from 'react';
import { login, signup, getProfile } from '../services/Api';
import { jwtDecode } from 'jwt-decode';
import Profile from '../components/Profile';

import '../css/Signup.css';

const SignupAndLogin = ({ token, setToken, admin, setRole, setProfile, setResponse, setTabIndex }) =>{
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
          if (decodedToken.role === 'admin') {
            setTabIndex(2); // Set to admin panel tab index
          } else {
            setTabIndex(0); // Set to default tab index
          }
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
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      
    </div>
  );
}

export default SignupAndLogin;