import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Chip } from "primereact/chip";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { createNewUser, getUserByEmail } from "../../services/index";
import notify from "../CustomToast";
import * as constants from "../../constants";
import AuthContext from "../../services/authContext";

function SignupButton() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const [sportValue, setSportValue] = useState();
  const [levelValue, setLevelValue] = useState();
  const authContext = useContext(AuthContext);
  const [sportsName, setSportsName] = useState(Object.keys(constants.SPORT_TO_LOCATIONS_MAPPING));

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
    matchPassword: "",
  });

  const onInput = (e) => {
    const { id, value } = e.target;

    if (id === "password") {
      bcrypt
        .hash(value, 10)
        .then((hashedPassword) => {
          setData({
            ...data,
            password: hashedPassword,
          });
        })
        .catch(() => {
          notify("Password was not hashed successfully", "error");
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

    bcrypt
      .compare(data.confirmPassword, data.password)
      .then((passwordCheck) => {
        if (passwordCheck) {
          createNewUser(data)
            .then((res) => {
              if (res.data.success) {
                notify("Account created successfully", "success");
                getUserByEmail(data.email)
                  .then((result) => {
                    authContext.setupSessionInfo(true, result.data.User._id);
                  })
                  .catch((getIDerror) => {
                    notify(`Failed to fetch object ID (${getIDerror.message})`, "error");
                  });
                navigate("/");
                setData({});
                setError({});
                handleClose();
              }
            })
            .catch((err) => {
              notify(`Failed to create a new user (${err.error})`, "error");
            });
        } else {
          setError({
            matchPassword: "Password does not match",
          });
          authContext.setupSessionInfo(false, "");
        }
      })
      .catch((bcrypytErr) => {
        notify(`Password failed to unhash/does not match (${bcrypytErr.message})`, "error");
      });
  };

  const updateInterest = (e) => {
    const { id, value } = e.target;
    if (id === "sport") {
      setSportValue(value);
    } else if (id === "level") {
      setLevelValue(value);
    }
  };

  const addInterest = () => {
    if (!sportValue || !levelValue) return;

    setData({
      ...data,
      interests: [...data.interests, { sport: sportValue, level: levelValue }],
    });
    const newSportsArray = sportsName.filter((remainingSport) => {
      return remainingSport !== sportValue;
    });
    setSportsName(newSportsArray);
    setSportValue();
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
              }}
            />
          </div>
        );
      })
    : null;

  return (
    <>
      <Button
        style={{ fontWeight: "bold", color: "grey", backgroundColor: "transparent", border: "none" }}
        onClick={handleShow}
      >
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
              <Form.Control type="email" onChange={onInput} placeholder="Enter a valid email" required />
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
                  <option value="">Select Sport</option>
                  {sportsName.map((sport) => (
                    <option value={sport}>{sport}</option>
                  ))}
                </Form.Select>
                <Form.Select id="level" onChange={updateInterest}>
                  <option value="">Select Skill Level</option>
                  {constants.SKILL_LEVEL.map((proficiency) => (
                    <option value={proficiency}>{proficiency}</option>
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
            </Form.Group>

            <Form.Group className="mb-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" onChange={onInput} placeholder="Please re-enter password" required />
              {formErrors.matchPassword && <p className="text-danger">{formErrors.matchPassword}</p>}
            </Form.Group>

            <Button style={{ marginTop: 10 }} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignupButton;
