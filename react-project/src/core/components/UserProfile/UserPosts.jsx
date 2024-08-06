import MyWorkCard from '../Home/Work';

const UserPosts = ({ profile }) => {

    const posts = [
        { title: 'Project 1', description: 'Description 1', imageUrl: 'https://via.placeholder.com/300' },
        { title: 'Project 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/300' },
        { title: 'Project 3', description: 'Description 3', imageUrl: 'https://via.placeholder.com/300' },
    ]

    return (
        <>
            <div className="project-grid">
                {posts.map((project, index) => (
                    <MyWorkCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                    />
                ))}
            </div>
        </>
    )
}

export default UserPosts;