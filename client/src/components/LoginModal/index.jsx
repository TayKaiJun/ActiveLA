/* eslint no-underscore-dangle: 0 */

import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../services/user-service";
import { setLoginState } from "../../services/auth-service";
import AuthContext from "../../services/authContext";

function LoginModal(props) {
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

  const { authState, toggleAuthState } = useContext(AuthContext);

  const [formErrors, setError] = useState({
    email: "",
    password: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    getUserByEmail(data.email)
      .then((res) => {
        setError({
          ...formErrors,
          email: ""
        })

        bcrypt
          .compare(data.password, res.data.User[0].password)
          .then((passwordCheck) => {
            if (passwordCheck) {
              setLoginState(true);
              // toggleAuthState(res.data.User[0]._id);
              console.log("login successful") // TODO: make a toast for this instead
              setData({});
              handleClose();
            }
            else {
              setError({
                ...formErrors,
                password: "Wrong password!"
              })
              setLoginState(false);
            }
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        setError({
          ...formErrors,
          email: "Email does not exist!"
        })
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
              {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={onInput} />
              {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
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
