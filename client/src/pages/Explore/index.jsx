import React from "react";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter/ExploreFilter";
import EventCard from "./components/ExploreFilter/EventCard";

function Explore() {
  const name = "Beryl";

  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Discover Events</p>
      <p>
      <ExploreFilter
        onChange={(filtersState) => {
          // TODO: Make api call to update filters for explore page
          console.log(filtersState);
        }}
      />
      </p>
      <EventCard/>
    </PageLayout>
  );
}

export default Explore;
