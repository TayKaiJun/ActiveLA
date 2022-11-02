import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter/ExploreFilter";
import EventCard from "./components/ExploreFilter/EventCard";

function Explore() {

  const name = "Beryl"; // Replace with useEffect to get username if logged in else show login button

  return (
    <PageLayout>
      <Container>
        <Row>
          <Col sm={10}><h2>Welcome, {name} 👋</h2></Col>
        </Row>
      </Container>
      <p className="mt-4">Events near you</p>
      
      <ExploreFilter
        onChange={(filtersState) => {
          // TODO: Make api call to update filters for explore page
          console.log(filtersState);
        }}
      />
      <EventCard />
    </PageLayout>
  );
}

export default Explore;