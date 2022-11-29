import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import NavBarry from "../Navbar";
import { getRelatedEvents } from "../../../services";
import Events from "../../Explore/components/Events";

export default function Pending() {
  const uid = sessionStorage.getItem("userID");
  const [pendingEvents, setPendingEvents] = useState([]);

  const getEvent = async () => {
    const data = await getRelatedEvents(uid);
    setPendingEvents(data.data.pending);
    console.log(data);
    console.log(data.data.pending);
  };

  useEffect(() => {
    getEvent();
  }, []);
  console.log(pendingEvents);
  return (
    <PageLayout>
      <NavBarry />
      <h1> This should display the PENDING subpage</h1>
      <Events events={pendingEvents} />
    </PageLayout>
  );
}
