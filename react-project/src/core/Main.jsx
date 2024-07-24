import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { HandlePost } from "./tabs/Posts";
import { PortfolioList } from "./tabs/Portfolio";

import "react-tabs/style/react-tabs.css";
import SignupAndLogin from "./tabs/SignupLogin";
import AdminDashboard from "./tabs/AdminDashboard";
import Profile from './components/Profile';
import Loader from './components/Loader';

export default function Main() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [admin, setRole] = useState(localStorage.getItem("isAdmin") || "");
  const [profile, setProfile] = useState({});
  const [response, setResponse] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();

    if (storedProfile) setProfile(JSON.parse(storedProfile));
    
    setInterval(() => {
        setResponse("");
    }, 1000 * 5);
      
    return () => {
      handleComplete();
    }
  }, [location]);

  return (
    <>
      <div className="tab">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          {token && admin && <li><Link to="/admin">Admin Panel</Link></li>}
          {!token ? ( <li className="split"><Link to="/auth">Signup/Login</Link></li> ) : ( <li className="split"><Link to="/auth">Logout</Link></li> )}
          {token && <li className="split"><Link to="/profile">Account</Link></li>}
        </ul>
      </div>
      {loading && <Loader />}
      {response && <p style={{ textAlign: "center"}}>{response}</p>}
      <Routes>
        <Route path="/auth" 
          element={
            <SignupAndLogin
            token={token}
            setToken={setToken}
            role={admin}
            setRole={setRole}
            setProfile={setProfile}
            setResponse={setResponse}
            setTabIndex={setTabIndex}
            />}/>
        <Route path="/" element={<HandlePost />} />
        <Route path="/portfolio" element={<PortfolioList />} />
        {token && <Route path="/profile" element={<Profile profile={profile} />} />}
        {admin && (<Route path="/admin" element={<AdminDashboard token={token} />} />)}
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
      
    </>
  )

  /*return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Portfolio</Tab>
          <Tab>About</Tab>
          {token && admin && <Tab>Admin</Tab>}
          {!token ? (
            <Tab style={{ float: "right" }}>Signup/Login</Tab>
          ) : (
            <Tab style={{ float: "right" }}>Account</Tab>
          )}
        </TabList>

        <TabPanel>
          <HandlePost />
        </TabPanel>
        <TabPanel>
          <PortfolioList />
        </TabPanel>
        <TabPanel></TabPanel>
        {token && admin && (
          <TabPanel>
            <AdminDashboard token={token} />
          </TabPanel>
        )}
        <TabPanel>
          {token && <Profile profile={profile} />}
          <SignupAndLogin
            token={token}
            setToken={setToken}
            role={admin}
            setRole={setRole}
            setProfile={setProfile}
            setResponse={setResponse}
            setTabIndex={setTabIndex}
          />
          {response && <p>{response}</p>}
        </TabPanel>
      </Tabs>
    </>
  );*/
}
