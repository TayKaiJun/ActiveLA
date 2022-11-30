import React from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import badmintonImage from "./images/badminton.png";
import tableTennisImage from "./images/tabletennis.png";
import volleyballImage from "./images/volleyball.png";
import swimmingImage from "./images/swimming.png";
import soccerImage from "./images/soccer.png";
import rugbyImage from "./images/rugby.png";
import hockeyImage from "./images/hockey.png";
import frisbeeImage from "./images/frisbee.png";
import footballImage from "./images/football.png";
import cricketImage from "./images/cricket.png";
import basketballImage from "./images/basketball.png";
import baseballImage from "./images/baseball.png";

function ImageDisplay(props) {
  const { event } = props;
  switch (event.name) {
    case "Badminton":
      return badmintonImage;
    case "Table Tennis":
      return tableTennisImage;
    case "Volleyball":
      return volleyballImage;
    case "Swimming":
      return swimmingImage;
    case "Soccer":
      return soccerImage;
    case "Rugby":
      return rugbyImage;
    case "Hockey":
      return hockeyImage;
    case "Ultimate Frisbee":
      return frisbeeImage;
    case "Football":
      return footballImage;
    case "Cricket":
      return cricketImage;
    case "Basketball":
      return basketballImage;
    case "Baseball":
      return baseballImage;
    default:
      return badmintonImage;
  }
}

function PendingCard(props) {
  const { event } = props;
  const { _id, name, date, time, location, ageGroup, playerNumber, costs, skillLevel } = event;
  const sportsname = ImageDisplay(props);
  const host = event.host === undefined || event.host === null ? "" : event.host.name;

  return (
    <Card>
      <Card.Img variant="top" src={sportsname} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Host: {host}</ListGroup.Item>
          <ListGroup.Item>Date: {date}</ListGroup.Item>
          <ListGroup.Item>Time: {time}</ListGroup.Item>
          <ListGroup.Item>Location: {location}</ListGroup.Item>
          <ListGroup.Item>Skill Level: {skillLevel}</ListGroup.Item>
          <ListGroup.Item>Age Group: {ageGroup}</ListGroup.Item>
          <ListGroup.Item>Number of Players Looking For: {playerNumber}</ListGroup.Item>
          <ListGroup.Item>Costs: {costs === undefined ? "None" : costs}</ListGroup.Item>
          <Alert variant="dark">Pending decision from host...</Alert>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default PendingCard;
