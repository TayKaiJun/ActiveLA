import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import badmintonImage from "./badminton.jpg";
import { getAllEvents } from "../../../../services/event-service";

function MoreDetails(event) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="col text-center">
        <Button variant="outline-primary" onClick={handleShow}>
          Find Out More
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Badminton</Modal.Title>
        </Modal.Header>
        <img className="img-responsive" src={badmintonImage} alt="" />
        <Modal.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Date:</ListGroup.Item>
            <ListGroup.Item>Time:</ListGroup.Item>
            <ListGroup.Item>Location:</ListGroup.Item>
            <ListGroup.Item>Skill Level:</ListGroup.Item>
            <ListGroup.Item>Age Group:</ListGroup.Item>
            <ListGroup.Item>Number of Players Looking For:</ListGroup.Item>
            <ListGroup.Item>Costs:</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Request to Join
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function EventCard() {
  const [events, getEvents] = useState("");

  useEffect(() => {
    getAllEvents()
      .then((response) => {
        const allEvents = response.data.Event;
        getEvents(allEvents);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(events);

  return (
    <Row xs={1} md={4} className="g-4">
      {events ? (
        events.map((event, idx) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={badmintonImage} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Date: {event.date}</ListGroup.Item>
                  <ListGroup.Item>Time: {event.time}</ListGroup.Item>
                  <ListGroup.Item>Location: {event.location}</ListGroup.Item>
                </ListGroup>
                <MoreDetails />
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Container />
      )}
    </Row>
  );
}

export default EventCard;
