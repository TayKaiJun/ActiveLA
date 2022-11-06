import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import EventCard from "../../../../components/EventCard";

function Events(props) {
  const { events } = props;

  // useEffect(() => {
  //   getAllEvents()
  //     .then((response) => {
  //       const allEvents = response.data.Event;
  //       getEvents(allEvents);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  return (
    <Row xs={1} md={4} className="g-4">
      {events ? events.map((event) => <EventCard event={event} />) : <Container />}
    </Row>
  );
}

export default Events;
