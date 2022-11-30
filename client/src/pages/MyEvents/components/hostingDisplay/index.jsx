import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import HostingCard from "../hostingCard";

function HostingEvents(props) {
  const { events } = props;

  return (
    <Row xs={1} md={4} className="g-4">
      {events ? (
        events.map((event) => (
          <Col>
            <HostingCard event={event} />
          </Col>
        ))
      ) : (
        <Container />
      )}
    </Row>
  );
}

export default HostingEvents;
