import React, { useState, useEffect } from "react";


const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    handleLogin(username, password)
  }

  /*const handleLogin = async () => {
    login(username, password)
      .then((res) => {
        const decodedToken = jwtDecode(res.data.token);
        setToken(res.data.token);
        setAdmin(decodedToken.isAdmin)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", decodedToken.isAdmin)
        setResponse("Login successful");
      })
      .catch((error) => {
        console.log("Error logging in", error);
        setResponse("Login failed");
      });
  };*/

  return (
    <div className="Login">
      <h1>Login</h1>
        <div>
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
          <button onClick={handleSubmit}>Login</button>
        </div>
    </div>
  )
};

export default Login;
