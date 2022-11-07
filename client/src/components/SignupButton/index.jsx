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

  const proficiency = {
    0: "No Experience",
    1: "Beginner",
    2: "Intermediate",
    3: "Expert",
  };

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

  const updateInterests = (e) => {
    console.log(e);
  };

  // TODO: Figure this shit out
  
  // const interestForm = (
  //   <InputGroup>
  //     <Dropdown onSelect={(eventKey) => {
  //             setData((prevState) => ({
  //               ...prevState,
  //               interests: [],
  //             }}>
  //       {sports.map((sportName) => {
  //           return <option value={sportName}>{sportName}</option>;
  //         })}
  //       </Dropdown>
  //       <Dropdown id="proficiency">
  //         {proficiency.map((skills) => {
  //           const { level, description } = skills;
  //           return <option value={level}>{description}</option>;
  //         })}
  //     </Dropdown>
  //     <Button onClick={updateInterests}>Add</Button>
  //   </InputGroup>
  // );

  const renderInterests = data.interests
    ? data.interests.map((interest) => {
        const { sport, level } = interest;
        const labelText = `${sport} (${level})`;
        return (
          <div style={{ marginLeft: "8px", marginTop: "10px", display: "inline-block" }}>
            <Chip
              label={labelText}
              removable // TODO: Debug the remove button
              onRemove={() => {
                const newInterestArray = data.interests.filter((remainingInterest) => {
                  return remainingInterest.sport !== sport;
                });
                console.log(newInterestArray);
                setData((prevState) => ({
                  ...prevState,
                  interests: newInterestArray,
                }));
              }}
            />
          </div>
        );
      })
    : null;

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
                {/* {interestForm} */}
                {/* <Form.Select>
                  <option value="Badminton">Badminton</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Volleyball">Volleyball</option>
                </Form.Select>
                <Form.Select>
                  <option value="0">No experience</option>
                  <option value="1">Beginner</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Expert</option>
                </Form.Select>
                <Button onClick={updateInterests}>Add</Button> */}
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
