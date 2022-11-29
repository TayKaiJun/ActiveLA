import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Chip } from "primereact/chip";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../services/user-service";
import notify from "../CustomToast";

function SignupButton(props) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
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
    interests: [],
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInput = (e) => {
    const { id, value } = e.target;

    let pass = false;
    if (data.password && data.confirmPassword && (id === "password" || id === "confirmPassword")) {
      if (data.password !== data.confirmPassword) {
        setError(() => ({ [id]: "Passwords do not match!" }));
        pass = false;
      } else {
        setError(() => ({ [id]: "" }));
        pass = true;
      }
    }

    if (id === "password") {
      bcrypt
        .hash(value, 10)
        .then((hashedPassword) => {
          console.log(value);
          setData({
            ...data,
            password: hashedPassword,
          });
        })
        .catch(() => {
          console.log("Password was not hashed successfully");
        });
      return;
    }
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    createNewUser(data)
      .then((res) => {
        if (res.success) {
          notify("Account created successfully", "success")
          navigate('/')
          setData({});
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateInterest = (e) => {
    const { id, value } = e.target;
    if (id === "sport") {
      sportValue = value;
      console.log("Updating %s: %s", id, value);
    } else {
      levelValue = value;
      console.log("Updating %s: %d", id, value);
    }
  };

  const addInterest = () => {
    // TODO: change value of a sport if it already exists
    setData({
      ...data,
      interests: [...data.interests, { sport: sportValue, level: levelValue }],
    });
  };

  const renderInterests = data.interests
    ? data.interests.map((interest) => {
        const { sport, level } = interest;
        const labelText = `${sport} (${level})`;
        return (
          <div style={{ marginLeft: "8px", marginTop: "10px", display: "inline-block" }}>
            <Chip
              label={labelText}
              removable // TODO: Fix remove button not showing
              onRemove={() => {
                const newInterestArray = data.interests.filter((remainingInterest) => {
                  return remainingInterest.sport !== sport;
                });
                setData({
                  ...data,
                  interests: newInterestArray,
                });
                console.log(newInterestArray);
              }}
            />
          </div>
        );
      })
    : null;

  return (
    <>
      <Button style={{fontWeight: "bold", color: "grey", backgroundColor: "transparent", border: "none"}} onClick={handleShow}>
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
                  {sports.map((sport) => (
                    <option value={sport}>{sport}</option>
                  ))}
                </Form.Select>
                <Form.Select id="level" onChange={updateInterest}>
                  <option>Select Skill Level</option>
                  {skillLevelMapping.map((proficiency, level) => (
                    <option value={level}>{proficiency}</option>
                  ))}
                </Form.Select>
                <Button variant="light" onClick={addInterest}>
                  Add
                </Button>
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
