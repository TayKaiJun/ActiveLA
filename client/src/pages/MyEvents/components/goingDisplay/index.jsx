/* eslint no-nested-ternary: "off" */

import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { ProgressSpinner } from "primereact/progressspinner";
import GoingCard from "../goingCard";
import PageStatus from "../../../../global/page-status";

function GoingEvents(props) {
  const { events } = props;
  const pageStatus = useContext(PageStatus);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {
      pageStatus.isLoading ? (
        <ProgressSpinner />
      ) : (
      events.length > 0 ? (
        <Row xs={1} md={4} className="g-4">
          { events.map((event) => (
            <Col>
              <GoingCard event={event} />
            </Col>
          ))}
        </Row>
        ) : (
        <div style={{display: "flex", flexDirection: "column", margin: "8rem auto 0 auto"}}>
          <h2> You have no confirmed events right now. </h2>
          <Button 
            style={{backgroundColor: "transparent", border: "none", color: "blue"}} 
            onClick={() => navigate("/")}
          > Search for more events here
          </Button>
        </div>
      ))}
    </div>
  );
}

export default GoingEvents;
