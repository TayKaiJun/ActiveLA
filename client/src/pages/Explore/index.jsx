import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter";
import EventCard from "./components/EventCard";

function Explore() {
  const name = "Beryl";
  const handleSubmitFilter = (filters) => {
    console.log(filters);
  };
  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Discover Events</p>
      <p
        style={{
          display: "flex",
        }}
      >
        <ExploreFilter onChange={handleSubmitFilter} />
      </p>
      <EventCard />
    </PageLayout>
  );
}

export default Explore;