import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ModalMoreDetails from "./ModalMoreDetails";
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

function EventCard(props) {
  const { event, requestJoinHandler } = props;
  const sportsname = ImageDisplay(props);
  const host = event.host === undefined || event.host === null ? "" : event.host.name;

  return (
    <Card>
      <Card.Img variant="top" src={sportsname} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Host: {host}</ListGroup.Item>
          <ListGroup.Item>Date: {event.date}</ListGroup.Item>
          <ListGroup.Item>Time: {event.time}</ListGroup.Item>
          <ListGroup.Item>Location: {event.location}</ListGroup.Item>
        </ListGroup>
        <ModalMoreDetails event={event} requestJoinHandler={requestJoinHandler} modalImageDisplay={sportsname} />
      </Card.Body>
    </Card>
  );
}

export default EventCard;
