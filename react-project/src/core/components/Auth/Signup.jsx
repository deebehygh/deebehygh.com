import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { signup } from "../../services/Api";

export default function Signup({ setResponse }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignup = () => {
    signup(email, username, password)
      .then(response => {
        setResponse('Signup successful. Please log in.');
      })
      .catch(error => {
        console.error('Error signing up', error);
        setResponse('Signup failed');
      });
  };

 
  return (
    <div className="Login">
      <h1>Signup</h1>
        <div>
        <input
            type="text"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Signup</button>
        </div>
    </div>
  );
}
