const UserStats = ({ profile }) => {
    return (
        <>
            <div className="userStats">
                <p className="stat">{profile.totalPosts}</p>
                <p className="statName">Posts</p>
                <p className="stat">{profile.totalFollowers}</p>
                <p className="statName">Followers</p>
                <p className="stat">{profile.totalFollowing}</p>
                <p className="statName">Following</p>
            </div>
        </>
    )
}

export default UserStats;