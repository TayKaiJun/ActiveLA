import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createNewUser } from "../../services/user-service";

function SignupButton(props) {

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const [data, setData] = useState({});
  const onInput = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    createNewUser(data)
      .then((res) => {
        if (res.success) {
          // TODO: Toast that indicates 
        }
        setData({});
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // TODO: Change default value to placeholders instead

  return (
    <>
      <Button className="ms-2 btn btn-primary" variant="primary" onClick={handleShow}>
        Sign Up
      </Button>
      <Modal show={modalShow} onHide={handleClose} size="m" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-2" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" autoFocus onChange={onInput} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={onInput} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={onInput} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="pronouns">
              <Form.Label>Pronouns</Form.Label>
              <Form.Check type="radio" name="group1" id="signup_pronouns-1" label="he/him" />
              <Form.Check type="radio" name="group1" id="signup_pronouns-2" label="she/her" />
              <Form.Check type="radio" name="group1" id="signup_pronouns-3" label="they/them" />
              <Form.Check type="radio" name="group1" id="signup_pronouns-4" label="No preference" />
            </Form.Group>

            <Form.Group className="mb-2" controlId="about">
              <Form.Label>About</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Give a short description about yourself"
                rows={3}
                onChange={onInput}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="interests">
              <Form.Label>Interest</Form.Label>
              {/* 
                TODO: 
                  - In each row, have a dropdown list that user can select interest from
                  - have a slider or a row of radio buttons to select proficiency level
                  - Have a button that creates a new row of entry to add more interests
               */}
              <Form.Control type="text" defaultValue="Indicate interests" disabled />
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Create Password</Form.Label>
              {/* TODO: remmove default value */}
              <Form.Control type="password" onChange={onInput} />
            </Form.Group>
            {/* TODO: Include validation for both passwords & check reentered password */}
            <Form.Group className="mb-2" controlId="password-repeat">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupButton;