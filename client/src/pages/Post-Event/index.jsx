import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageLayout from "../../components/PageLayout";



function postEvent() {
  return (
    <PageLayout>
      <h2>Post An Event!</h2>

      <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Your Name</Form.Label>
    <Form.Control type="text" />
    <Form.Text className="text-muted">
      Full name please!
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="date">
    <Form.Label>Date</Form.Label>
    <Form.Control type="text" placeholder="eg. 10/24/2022" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="time">
    <Form.Label>Time</Form.Label>
    <Form.Control type="text" placeholder="eg. 2:00pm" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="location">
    <Form.Label>Location</Form.Label>
    <Form.Control type="text" placeholder="eg. John Wooden Center" />
  </Form.Group>

{/* might implement a slider! */}
  <Form.Group className="mb-3" controlId="skill-level">
    <Form.Label>Skill Level</Form.Label>
    <Form.Control type="text" placeholder="Beginner, Intermediate, Advanced" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="age-group">
    <Form.Label>Age Group</Form.Label>
    <Form.Control type="text" placeholder="eg. 18-25" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="player-number" >
    <Form.Label>Number of Player to look for</Form.Label>
    <Form.Control type="text" placeholder="eg 5"/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="costs">
    <Form.Label>Costs</Form.Label>
    <Form.Control type="text" placeholder="$100"/>
  </Form.Group>

  <Button variant="primary" type="submit">
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
