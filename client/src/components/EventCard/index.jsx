import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ModalMoreDetails from "./ModalMoreDetails";
import badmintonImage from "./badminton.jpg";

function EventCard(props) {
  const { event } = props;
  return (
    <Card>
      <Card.Img variant="top" src={badmintonImage} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Date: {event.date}</ListGroup.Item>
          <ListGroup.Item>Time: {event.time}</ListGroup.Item>
          <ListGroup.Item>Location: {event.location}</ListGroup.Item>
        </ListGroup>
        <ModalMoreDetails event={event} />
      </Card.Body>
    </Card>
  );
}

export default EventCard;
