import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import GoingPendingCard from "../goingPendingCard";

function GoingPendingEvents(props) {
  const { events } = props;

  return (
    <Row xs={1} md={4} className="g-4">
      {events ? (
        events.map((event) => (
          <Col>
            <GoingPendingCard event={event} />
          </Col>
        ))
      ) : (
        <Container />
      )}
    </Row>
  );
}

export default GoingPendingEvents;
