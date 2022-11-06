import React, { useEffect, useState} from "react";
import axios from "axios";
import PageLayout from "../../components/PageLayout";
// import EventList from "./components/EventList"


function Activities() {
  // const [Events, getEvents] = useState('');

  // const url = 'http://localhost:8080/';

  // useEffect(() => {
  //   getAllEvents();
  // }, []);

  // const getAllEvents = () => {
  //   axios.get(`${url}events`)
  //   .then((response) => {
  //     const AllEvents = response.data.Events.AllEvents;
  //     getEvents(AllEvents);
  //   })
  //   .catch(error => console.error(`Error: ${error}`));
  // }

  return (
    <PageLayout>
      <h2>List of Activities</h2>
    </PageLayout>
  );
}

export default Activities;

