const UserInformation = ({ profile }) => {
    return (
        <>
            <div className="userInfo">
                <h2>Email</h2>
                <p>{profile.guid}</p>
                <h2>Username</h2>
                <p>{profile.username}</p>
                <h2>Phone Number</h2>
                <p>{profile.phoneNumber}</p>
                
                
            </div>
        </>
    )
}

export default UserInformation;