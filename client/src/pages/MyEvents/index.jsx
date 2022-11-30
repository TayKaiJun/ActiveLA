import React, { useState, useContext, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { getRelatedEvents } from "../../services";
import PageLayout from "../../components/PageLayout";
import AuthContext from "../../services/authContext";
import Events from "../Explore/components/Events";
import GoingEvents from "./components/goingDisplay";
import PendingEvents from "./components/pendingDisplay";
import HostingEvents from "./components/hostingDisplay";

function MyEvents() {
  const authContext = useContext(AuthContext);
  const uid = authContext.user;
  const [activeIndex, setActiveIndex] = useState(0);
  const [goingEvents, setGoingEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [hostingEvents, setHostingEvents] = useState([]);

  const getEvents = async () => {
    if (uid !== null) {
      const res = await getRelatedEvents(uid);
      const { hosting, going, pending } = res.data;
      setPendingEvents(pending);
      setGoingEvents(going);
      setHostingEvents(hosting);
    }
  };

  useEffect(() => {
    getEvents();
  }, [uid]);

  const handleTabChange = async (e) => {
    setActiveIndex(e.index);
    await getEvents();
  };

  return (
    <PageLayout>
      <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
        <TabPanel header="Hosting">
          <HostingEvents events={hostingEvents} />
        </TabPanel>
        <TabPanel header="Going">
          <GoingEvents events={goingEvents} />
        </TabPanel>
        <TabPanel header="Pending">
          <PendingEvents events={pendingEvents} />
        </TabPanel>
      </TabView>
    </PageLayout>
  );
}

export default MyEvents;
