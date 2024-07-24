import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/Api';

const Profile = ({ profile }) => {
  return (
    <div className='userProfile'>
      <h1>Profile</h1>
      <img src={profile.pfp} alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
      <p><strong>AccountId:</strong> {profile.id}</p>
      <p><strong>Email:</strong> {profile.guid}</p>
      <p><strong>Posts:</strong> {profile.totalPosts}</p>
      <p><strong>Username:</strong> {profile.username}</p>
    </div>
  );
};

export default Profile;