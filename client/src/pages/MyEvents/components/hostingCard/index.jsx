import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import badmintonImage from "../../../../components/EventCard/images/badminton.png";
import tableTennisImage from "../../../../components/EventCard/images/tabletennis.png";
import volleyballImage from "../../../../components/EventCard/images/volleyball.png";
import swimmingImage from "../../../../components/EventCard/images/swimming.png";
import soccerImage from "../../../../components/EventCard/images/soccer.png";
import rugbyImage from "../../../../components/EventCard/images/rugby.png";
import hockeyImage from "../../../../components/EventCard/images/hockey.png";
import frisbeeImage from "../../../../components/EventCard/images/frisbee.png";
import footballImage from "../../../../components/EventCard/images/football.png";
import cricketImage from "../../../../components/EventCard/images/cricket.png";
import basketballImage from "../../../../components/EventCard/images/basketball.png";
import baseballImage from "../../../../components/EventCard/images/baseball.png";
import DeleteEventModal from "../DeleteEventModal";
import SeeRequestsModal from "../SeeRequestsModal";

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

function HostingCard(props) {
  const { event, requestJoinHandler } = props;
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
        </ListGroup>
        <DeleteEventModal eventID={_id} />
        <SeeRequestsModal event={event} />
      </Card.Body>
    </Card>
  );
}

export default HostingCard;
