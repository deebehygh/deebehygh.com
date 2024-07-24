import React from 'react';

const Logout = ({ setToken, setId, setResponse }) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setResponse('Logged out');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;