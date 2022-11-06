import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function EventCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Sport Type</Card.Title>
        <Card.Text>
          Just looking for some friends to join us!
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Date</ListGroup.Item>
        <ListGroup.Item>Time</ListGroup.Item>
        <ListGroup.Item>Location</ListGroup.Item>
        <ListGroup.Item>Skill Level</ListGroup.Item>
        <ListGroup.Item>Age Group</ListGroup.Item>
        <ListGroup.Item>Number of Players Looking For</ListGroup.Item>
        <ListGroup.Item>Costs</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Request to Join</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default EventCard;


/* { <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Sport Type</Card.Title>
              <Card.Text>
                Just looking for some friends to join us!
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Date</ListGroup.Item>
              <ListGroup.Item>Time</ListGroup.Item>
              <ListGroup.Item>Location</ListGroup.Item>
              <ListGroup.Item>Skill Level</ListGroup.Item>
              <ListGroup.Item>Age Group</ListGroup.Item>
              <ListGroup.Item>Number of Players Looking For</ListGroup.Item>
              <ListGroup.Item>Costs</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Request to Join</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row> } */