import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter";
import Events from "./components/Events";
import getAllEvents from "../../services";
import useIsFirstRender from "../../hooks/useIsFirstRender";

function Explore() {
  const name = "Beryl";
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);
  const [filterChangeObserver, setFilterChangeObserver] = useState(0);

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
      <Events events={events} />
    </PageLayout>
  );
}

export default Explore;