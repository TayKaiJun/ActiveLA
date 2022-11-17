import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import badmintonImage from "../badminton.jpg";

function ModalMoreDetails(props) {
  const { event, requestJoinHandler} = props;
  const { _id, name, date, time, location, ageGroup, playerNumber, costs, skillLevel } = event;
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
            <ListGroup.Item>Date: {date}</ListGroup.Item>
            <ListGroup.Item>Time: {time}</ListGroup.Item>
            <ListGroup.Item>Location: {location}</ListGroup.Item>
            <ListGroup.Item>Skill Level: {skillLevel}</ListGroup.Item>
            <ListGroup.Item>Age Group: {ageGroup}</ListGroup.Item>
            <ListGroup.Item>Number of Players Looking For: {playerNumber}</ListGroup.Item>
            <ListGroup.Item>Costs: {costs}</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => requestJoinHandler(_id)}>
            Request to Join
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMoreDetails;
