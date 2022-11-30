import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import postEvent from "../../../Post-Event";
import UpdateEventsFormInModal from "../UpdateEventsFormInModal";

function UpdateEventsModal(props) {
  /* eventID will be passed down using props */
  const eventID = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Event
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <UpdateEventsFormInModal eventID={eventID} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            I changed my mind
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEventsModal;
