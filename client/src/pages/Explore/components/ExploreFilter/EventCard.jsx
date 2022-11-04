import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import badmintonImage from "./badminton.jpg"

function MoreDetails() {
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
        <img className="img-responsive" src={badmintonImage} alt=""/>
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
  return (
    <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={badmintonImage} />
            <Card.Body>
              <Card.Title>Badminton</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Date:</ListGroup.Item>
                <ListGroup.Item>Time:</ListGroup.Item>
                <ListGroup.Item>Location:</ListGroup.Item>
              </ListGroup>
              <MoreDetails />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}



export default EventCard;
