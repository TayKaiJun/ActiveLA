import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function SignupButton(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
              <Form.Control type="text" placeholder="Username" autoFocus />
            </Form.Group>

            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="joebruin@g.ucla.edu" />
            </Form.Group>

            <Form.Group className="mb-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Joe Bruin" autoFocus />
            </Form.Group>

            <Form.Group className="mb-2" controlId="pronouns">
              <Form.Label>Pronouns</Form.Label>
              <Form.Check type="radio" name="group1" id="signup_pronouns-1" label="he/him" />

              <Form.Check type="radio" name="group1" id="signup_pronouns-2" label="she/her" />

              <Form.Check type="radio" name="group1" id="signup_pronouns-3" label="they/them" />

              <Form.Check type="radio" name="group1" id="signup_pronouns-3" label="No preference" />
            </Form.Group>

            <Form.Group className="mb-2" controlId="about">
              <Form.Label>About</Form.Label>
              <Form.Control type="textarea" placeholder="Give a short description about yourself" rows={3} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="interest">
              <Form.Label>Interest</Form.Label>
              {/* 
                TODO: 
                  - In each row, have a dropdown list that user can select interest from
                  - have a slider or a row of radio buttons to select proficiency level
                  - Have a button that creates a new row of entry to add more interests
               */}
              <Form.Control type="text" placeholder="Indicate interests" disabled />
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Create Password</Form.Label>
              <Form.Control type="password"/>
            </Form.Group>

            <Form.Group className="mb-2" controlId="password-repeat">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type="password"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupButton;
