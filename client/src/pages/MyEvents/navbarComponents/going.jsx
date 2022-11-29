import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import NavBarry from "../Navbar";
import { getRelatedEvents } from "../../../services";
import Events from "../../Explore/components/Events";

export default function Going() {
  const uid = sessionStorage.getItem("userID");
  const [goingEvents, setGoingEvents] = useState([]);

  const getEvent = async () => {
    const data = await getRelatedEvents(uid);
    setGoingEvents(data.data.going);
    console.log(data);
    console.log(data.data.going);
  };

  useEffect(() => {
    getEvent();
  }, []);
  console.log(goingEvents);

  return (
    <PageLayout>
      <NavBarry />
      <h1> This should display the GOING subpage</h1>
      <Events events={goingEvents} />
    </PageLayout>
  );
}
