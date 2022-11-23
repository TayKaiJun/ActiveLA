import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter";
import Events from "./components/Events";
import useIsFirstRender from "../../hooks/useIsFirstRender";
import AuthContext from "../../services/authContext";
import {
  getAllEvents,
  getUserByID,
  requestToJoinEvent
} from "../../services";

function Explore() {

  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);
  const [filterChangeObserver, setFilterChangeObserver] = useState(0);

  const authContext = useContext(AuthContext)
  const uid = authContext.getUser()
  const [name, setName] = useState()

  useEffect(() => {
    getUserByID(uid).then((res) => {
      console.log(res)
      setName(res.data.User.name)
    }).catch((err) => {
      console.log(err)
    })
  }, [uid])


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
    if (!authContext.authState) {
      // TODO: Auto redirect to login
      console.log("Please login first")
      return null
    }
    const res = await requestToJoinEvent(uid, eid);
    return res;
  }

  return (
    <PageLayout>
      <h2>Welcome { uid ? name : "to ActiveLA"} 👋</h2>
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
