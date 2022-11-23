import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter";
import Events from "./components/Events";
import useIsFirstRender from "../../hooks/useIsFirstRender";
import AuthContext from "../../services/authContext";
import {
  getAllEvents,
  requestToJoinEvent
} from "../../services";

function Explore() {
  const name = "Beryl";
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);
  const [filterChangeObserver, setFilterChangeObserver] = useState(0);
  const loggedIn = useContext(AuthContext);
  const updateEventsOnFilterChange = async () => {
    const fetchedEvents = await getAllEvents(filters);
    setEvents(fetchedEvents);
  };

  const firstRender = useIsFirstRender();

  useEffect(() => {
    if (!firstRender) {
      updateEventsOnFilterChange();
    }
  }, [filterChangeObserver]);

  const requestJoinHandler = async (eid) => {
    if (!loggedIn) {
      // TODO: Auto redirect to login
      console.log("Please login first")
    } else {
      const uid = sessionStorage.getItem("currentUser");
      const res = await requestToJoinEvent(uid, eid);
      console.log("Request to join event", res);
    }
  }

  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Discover Events</p>
      <p
        style={{
          display: "flex",
        }}
      >
        <ExploreFilter
          onChange={(exploreFilter) => {
            setFilters(exploreFilter);
            setFilterChangeObserver((prevObserver) => prevObserver + 1);
          }}
        />
      </p>
      <Events events={events} requestJoinHandler={requestJoinHandler} />
    </PageLayout>
  );
}

export default Explore;