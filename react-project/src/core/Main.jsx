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
import Home from "./components/Home";

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
        <img
            className="pfp"
            src="https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj"
            alt="Desmond Ward"
          />
        <ul>
          {!token ? ( <li><Link style={{ color: "white" }} to="/auth">Signup/Login</Link></li> ) : ( <li><Link  style={{ color: "white" }}to="/auth">Logout</Link></li> )}
          {token && <li><Link style={{ color: "white" }} to="/profile">Account</Link></li>}
          
          <li><Link style={{ color: "white" }}to="/community">Community</Link></li>
          <li><Link style={{ color: "white" }}to="/">Home</Link></li>      
        </ul>
      </div>
      
      <hr className="solid"/>
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
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<HandlePost/>}/>
        {token && <Route path="/profile" element={<Profile profile={profile} token={token}/>} />}
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
