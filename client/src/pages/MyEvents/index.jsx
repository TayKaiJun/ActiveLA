import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PageLayout from "../../components/PageLayout";

function MyEvents() {
  return (
    <PageLayout>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#hosting">Hosting</Nav.Link>
              <Nav.Link href="#going">Going</Nav.Link>
              <Nav.Link href="#pending">Pending</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </PageLayout>
  );
}

export default MyEvents;
