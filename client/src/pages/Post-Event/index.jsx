import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import PageLayout from "../../components/PageLayout";
import { addEventService } from "../../services/event-service";

function postEvent() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { name, date, time, location, ageGroup, playerNumber, costs, skillLevel } = form;
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Please enter your name";
    if (!date || date === "") newErrors.date = "Please enter date";
    if (!time || time === "") newErrors.time = "Please enter time";
    if (!location || location === "") newErrors.location = "Please enter location";
    if (!ageGroup || ageGroup === "") newErrors.ageGroup = "Please enter an age group";
    if (!playerNumber || playerNumber === "") newErrors.playerNumber = "Please enter player number";
    if (!costs || costs === "") newErrors.costs = "Please enter costs";
    if (!skillLevel || skillLevel === "") newErrors.skillLevel = "Please enter skill level";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      console.log("error! Displaying form object");
      console.log(form);
      setErrors(formErrors);
    } else {
      addEventService(form)
        .then((res) => console.log(res.message))
        .catch((err) => console.log(err.message));
      // console.log('submitted form! Displaying form object')
      // console.log(form)
    }
  };

  return (
    <PageLayout>
      <h2>Post An Event!</h2>

      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          <Form.Text className="text-muted">Full name please!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg. 10/24/2022"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg. 2:00pm"
            value={form.time}
            onChange={(e) => setField("time", e.target.value)}
            isInvalid={!!errors.time}
          />
          <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg. John Wooden Center"
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            isInvalid={!!errors.location}
          />
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ageGroup">
          <Form.Label>Age Group</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg. 18-25"
            value={form.ageGroup}
            onChange={(e) => setField("ageGroup", e.target.value)}
            isInvalid={!!errors.ageGroup}
          />
          <Form.Control.Feedback type="invalid">{errors.ageGroup}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="playerNumber">
          <Form.Label>Number of Player to look for</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg 5"
            value={form.playerNumber}
            onChange={(e) => setField("playerNumber", e.target.value)}
            isInvalid={!!errors.playerNumber}
          />
          <Form.Control.Feedback type="invalid">{errors.playerNumber}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="costs">
          <Form.Label>Costs</Form.Label>
          <Form.Control
            type="text"
            placeholder="$100"
            value={form.costs}
            onChange={(e) => setField("costs", e.target.value)}
            isInvalid={!!errors.costs}
          />
          <Form.Control.Feedback type="invalid">{errors.costs}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="skillLevel">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg Beginner/Intermediate/Advanced"
            value={form.skillLevel}
            onChange={(e) => setField("skillLevel", e.target.value)}
            isInvalid={!!errors.skillLevel}
          />
          <Form.Control.Feedback type="invalid">{errors.skillLevel}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </PageLayout>
  );
}

export default postEvent;

// let Event = new Schema({
//   // List attributes model will contain. They will correspond to attribute name in MongoDB
//   name: {
//       type: String
//   },
//   date: {
//       type: String
//   },
//   time: {
//       type: String
//   },
//   location: {
//       type: String
//   },
//   skilllevel: {
//       type: String
//   },
//   agegroup: {
//       type: String
//   },
//   numberofplayerslookingfor: {
//       type: String
//   },
//   costs: {
//       type: String
//   }
// });
