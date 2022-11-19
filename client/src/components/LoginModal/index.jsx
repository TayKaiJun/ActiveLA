/* eslint no-underscore-dangle: 0 */

import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AuthContext from "../../services/authContext";
import { getUserByEmail } from "../../services/user-service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function LoginModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  // authState: {Logged in: true, Logged out: false} toggleAuthState: {sets authState to state}
  const { authState, toggleAuthState } = useContext(AuthContext);

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
    getUserByEmail(data.email)
      .then((res) => {
        bcrypt
          .compare(res.data.User[0].password, data.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              console.log("Passwords does not match");
              return;
            }

            //JWT token created here
            const token = jwt.sign(
              {
                userID: res.data.User[0]._id,
                userEmail: res.data.User[0].email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "1hr" }
            );

            console.log("Login Successful");
            toggleAuthState(res.data.User[0]._id);
            setData({});
            handleClose();
          })
          .catch(() => console.log("Passwords does not match"));
      })
      .catch((err) => {
        // TODO: Display some error message. Maybe a cute toast on bottom right corner
        console.log(err.message);
      });
  };

  return (
    <>
      <Button className="me-2 ms-5 btn btn-primary" variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={modalShow} onHide={handleClose} size="s" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <h3>Login</h3>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={onInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={onInput} />
            </Form.Group>
            <Form.Text className="text-muted">
              Forgot your password? Reset <a href="www.google.com">here</a>.
            </Form.Text>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
