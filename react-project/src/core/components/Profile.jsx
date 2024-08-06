import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserProfilePic from './UserProfile/UserProfilePic';

import UserInformation from './UserProfile/UserInformation';
import UserStats from './UserProfile/UserStats';
import UserTabs from './UserProfile/UserTabs';
import Footer from './Footer';

import '../css/UserProfile.css'

const Profile = ({ profile, token }) => {
  return (
    <>

      <div className='userProfile'>
        <UserProfilePic profile={profile}/>
        <div className='userProfileInfo'>
          <div className='usernameButton'>
            <h1>{profile.username}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/></svg>
          </div>
          <UserStats profile={profile}/>
          <p className='userBio'>{profile.bioContent}</p>
        </div>
      </div>
      <UserTabs profile={profile} token={token}/>
      <Footer/>
    </>
  );
};

export default Profile;