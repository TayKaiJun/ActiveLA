import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EventCard from "../../../../components/EventCard";

function Events(props) {
  const { events, requestJoinHandler } = props;

  return (
    <Row xs={1} md={4} className="g-4">
      {events ? (
        events.map((event) => (
          <Col>
            <EventCard event={event} requestJoinHandler={requestJoinHandler}/>
          </Col>
        ))
      ) : (
        <Container />
      )}
    </Row>
  );
}

export default Events;
