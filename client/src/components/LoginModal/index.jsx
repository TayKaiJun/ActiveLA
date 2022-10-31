import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AuthContext from '../../services/authContext';
import {
  getUserByEmail
} from '../../services/user-service'

function LoginModal(props) {

  const { show, onHide } = props;
  // authState: {Logged in: true, Logged out: false} toggleAuthState: {sets authState to state}
  const {authState, toggleAuthState} = useContext(AuthContext)

  const [data, setData] = useState({})
  const onInput = (e) => {
    const { id, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }
  const onFormSubmit = e => {
    e.preventDefault()
    getUserByEmail(data.email).then((res) => {
      // Password is found in res.data.User[0] object
      if (res.data.User[0].password === data.password) {
        toggleAuthState(true)
        setData({})
        onHide()
      }
    }).catch((err) => {
      
      // TODO: Display some error message.
      console.log(err.message)
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="s"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
            Forgot your password? Reset <a href='www.google.com'>here</a>.
          </Form.Text>
          <Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;