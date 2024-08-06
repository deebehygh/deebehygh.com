import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "../../css/App.css";

export function MyProfile() {
  const [followers, setFollowers] = useState(-1);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:3001/api/user/getFollowers')
      .then(response => {
        setFollowers(response.data.data);
        console.log(response)
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });
  }, []);
  
  return (
    <>
      <div className="myprofile">
        <img
          className="pfp"
          src="https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj"
          alt="Desmond Ward"
        />
        <p>
          <span className="namename">Desmond Ward</span>
          <br />
          @DeeBeHygh - {followers} Followers
          <br />
          DeeBeHygh - Des - Desmond
          <br />
          <a href="https://discord.gg/BdabcQjyWz">Discord Server</a>
        </p>
      </div>
    </>
  );
}

export function MyBanner() {
  return (
    <>
      <img
        className="banner"
        src="https://yt3.googleusercontent.com/QHXmh2SHIXbvzFUoo-Y3-k13yPO-L89UPWl_H7-xsHKiQMH6fn4GsYDaKcZ8pf2dJJi8-iah=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
        alt="Desmond's Banner. Subscribe"
      />
      <MyProfile />
    </>
  );
}
