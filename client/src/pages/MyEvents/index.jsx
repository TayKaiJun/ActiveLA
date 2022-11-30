import React, { useState, useContext, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import PageStatus from "../../global/page-status";
import { getRelatedEvents } from "../../services";
import PageLayout from "../../components/PageLayout";
import AuthContext from "../../services/authContext";
import Events from "../Explore/components/Events";

function MyEvents() {
  const authContext = useContext(AuthContext);
  const uid = authContext.user;
  const [activeIndex, setActiveIndex] = useState(0);
  const [goingEvents, setGoingEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [hostingEvents, setHostingEvents] = useState([]);
  const pageStatus = useContext(PageStatus);

  const getEvents = async () => {
    if (uid !== null) {
      pageStatus.updatePageStatus(true);
      const res = await getRelatedEvents(uid);
      const { hosting, going, pending } = res.data;
      pageStatus.updatePageStatus(false);
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
          <Events events={hostingEvents} />
        </TabPanel>
        <TabPanel header="Going">
          <Events events={goingEvents} />
        </TabPanel>
        <TabPanel header="Pending">
          <Events events={pendingEvents} />
        </TabPanel>
      </TabView>
    </PageLayout>
  );
}

export default MyEvents;
