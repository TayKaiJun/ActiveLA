import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import NavBarry from "../Navbar";
import { getRelatedEvents } from "../../../services";
import Events from "../../Explore/components/Events";

export default function Hosting() {
  const uid = sessionStorage.getItem("userID");
  const [hostingEvents, setHostingEvents] = useState([]);

  const getEvent = async () => {
    const data = await getRelatedEvents(uid);
    setHostingEvents(data.data.hosting);
    console.log(data);
    console.log(data.data.hosting);
  };

  useEffect(() => {
    getEvent();
  }, []);
  console.log(hostingEvents);

  return (
    <PageLayout>
      <NavBarry />
      <h1> This should display the HOSTING subpage </h1>
      <Events events={hostingEvents} />
    </PageLayout>
  );
}
