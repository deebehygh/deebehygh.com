import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState, useEffect } from "react";
import UserPosts from "./UserPosts";
import AdminDashboard from "../../tabs/AdminDashboard";

const UserTabs = ({ profile, token }) => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabSelect = async (index) => {
        setTabIndex(index);
        window.location.href();
      };

    return (
        <>
        <div className="userTabs">
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
                <TabList style={{ textAlign: "center" }}>
                    <Tab>Posts</Tab>
                    <Tab>Achieve</Tab>
                    <Tab>Create Post</Tab>
                </TabList>

                <TabPanel>
                    <UserPosts/>
                </TabPanel>
                <TabPanel>
                    User Achieve
                </TabPanel>
                <TabPanel>
                    <AdminDashboard profile={profile} token={token}/>
                </TabPanel>
            </Tabs>
        </div>
        </>
    )
}

export default UserTabs;