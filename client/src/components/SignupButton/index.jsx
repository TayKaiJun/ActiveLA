import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Chip } from "primereact/chip";
import { createNewUser } from "../../services/user-service";

function SignupButton(props) {
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const interestsList = [{ sport: "Baseball", level: 1 }];
  let sportValue = "";
  let levelValue = 0;

  const sports = [
    "Badminton",
    "Basketball",
    "Baseball",
    "Cricket",
    "Hockey",
    "Soccer",
    "Rugby",
    "Football",
    "Ultimate",
    "Volleyball",
    "Swimming",
  ];

  const skillLevelMapping = [
    (1, "No Experience"),
    (2, "Beginner"),
    (3, "Intermediate"),
    (4, "Expert"),
    (5, "Professional"),
  ];

  const [data, setData] = useState({
    username: "",
    email: "",
    name: "",
    pronouns: "",
    about: "",
    interests: [
      // TODO: Remove placeholder
      { sport: "Soccer", level: 3 },
      { sport: "Baseball", level: 2 },
    ],
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInput = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (data.password && data.confirmPassword && (id === "password" || id === "confirmPassword")) {
      if (data.password !== data.confirmPassword) {
        setError(() => ({ [id]: "Passwords do not match!" }));
      } else {
        setError(() => ({ [id]: "" }));
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    setData({
      ...data,
      interests: interestsList,
    });

    createNewUser(data)
      .then((res) => {
        if (res.success) {
          // TODO: Make the Toast Popup showup

          <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Sign-up Status</strong>
            </Toast.Header>
            <Toast.Body>Woohoo, you&apos;ve successfully signed up!</Toast.Body>
          </Toast>;
        }
        setData({});
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateInterest = (e) => {
    const { id, value } = e.target;
    if (id === 'sport') {
      sportValue = value;
      console.log('Updating %s: %s', id, value)
    } else {
      levelValue = value;
      console.log('Updating %s: %d', id, value)
    }    
  };

  const addInterest = () => {
    // TODO: change value of a sport if it already exists
    interestsList.push({ 'sport': sportValue, 'level': levelValue });
    console.log(interestsList)
  };

  // TODO: Fix rendering
  const renderInterests = interestsList.map((interest) => {
    const { sport, level } = interest;
    const labelText = `${sport} (${level})`;
    return (
      <div style={{ marginLeft: "8px", marginTop: "10px", display: "inline-block" }}>
        <Chip
          label={labelText}
          // removable
          // onRemove={() => {
          //   const newInterestArray = interestsList.filter((remainingInterest) => {
          //     return remainingInterest.sport !== sport;
          //   });
          //   console.log(newInterestArray);
          // }}
        />
      </div>
    );
  });

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
              <Form.Control type="text" autoFocus onChange={onInput} placeholder="Create username" required />
            </Form.Group>

            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={onInput} placeholder="Enter a valid UCLA email" required />
            </Form.Group>

            <Form.Group className="mb-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={onInput} placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-2" controlId="pronouns">
              <Form.Label>Pronouns</Form.Label>
              <Form.Control as="select" onChange={onInput} placeholder="Select your pronouns">
                <option value="Do not wish to declare">Select your pronouns</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
                <option value="Others">Others</option>
              </Form.Control>
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

            <Form.Group className="mb-2">
              <Form.Label>Interests & Proficiency Level</Form.Label>
              <InputGroup>
                <Form.Select id="sport" onChange={updateInterest}>
                  <option>Select Sport</option>
                  {sports.map((sport) => <option value={sport}>{sport}</option>)}
                </Form.Select>
                <Form.Select id="level" onChange={updateInterest}>
                  <option>Select Skill Level</option>
                  {skillLevelMapping.map((proficiency, level) => <option value={level}>{proficiency}</option>)}
                </Form.Select>
                <Button variant="light" onClick={addInterest}>Add</Button>
              </InputGroup>
              <div>{renderInterests}</div>
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Create Password</Form.Label>
              <Form.Control type="password" onChange={onInput} placeholder="Create a password" required />
              {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
            </Form.Group>

            <Form.Group className="mb-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" onChange={onInput} placeholder="Please re-enter password" required />
              {formErrors.confirmPassword && <p className="text-danger">{formErrors.confirmPassword}</p>}
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
