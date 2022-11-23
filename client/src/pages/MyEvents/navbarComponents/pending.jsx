import React, { useState, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import NavBarry from "../Navbar";
import { getRelatedEvents } from "../../../services";
import Events from "../../Explore/components/Events";

export default function Pending() {
  const uid = sessionStorage.getItem("userID");
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const returnValue = async () => {
      const data = await getRelatedEvents(uid);
      setPendingEvents(data.pending);
      console.log(data);
    };
    returnValue();
  }, []);
  console.log(pendingEvents);

  // useEffect(() => {
  //   const returnValue = getRelatedEvents(uid);
  //   console.log(returnValue);
  //   return returnValue;
  // }, []);

  return (
    <PageLayout>
      <NavBarry />
      <h1> This should display the PENDING subpage</h1>
      <Events events={pendingEvents} />
    </PageLayout>
  );
}
