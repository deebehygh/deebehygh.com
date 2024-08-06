import Footer from "./Footer";
import MainBanner from "./Home/MainBanner";
import ProjectGrid from "./Home/ProjectGrid";
import MyServices from "./Home/Services";

const projects = [
    { title: 'GalaTelecast', description: 'RSS Discord Bot based off DiscordJS', imageUrl: 'https://via.placeholder.com/300' },
    { title: 'GalaTelecastPy', description: 'RSS Discord Bot based off DiscordPY', imageUrl: 'https://via.placeholder.com/300' },
    { title: 'Dynasty Games', description: 'FlexSDK Game Project', imageUrl: '/images/dynasty.png' },
    
    // Add more projects if needed
  ];

const Home = () => {
    return (
        <>
            <div className="home">
                <MainBanner />
                <hr className="solid" />
                <h5>My Work</h5>
                <ProjectGrid projects={projects} /> 
                <div className="services">
                    <h5>My Services</h5>
                    <MyServices/> 
                </div>
                <Footer/>
            </div>
            
        </>
    )
}

export default Home;