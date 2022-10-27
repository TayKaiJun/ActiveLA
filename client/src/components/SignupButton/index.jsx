import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function SignupButton(props){
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal 
        show={modalShow} 
        onHide={handleClose}
        size="s"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-2" controlId="signup_username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="signup_email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="joebruin@g.ucla.edu"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="signup_name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Joe Bruin"
                autoFocus
              />
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