const UserProfilePic = ({ profile }) => {
    return (
        <>
            <div className="userPfp">
                <img src={profile.pfp} alt="Profile" />
            </div>
        </>
    )
}

export default UserProfilePic;