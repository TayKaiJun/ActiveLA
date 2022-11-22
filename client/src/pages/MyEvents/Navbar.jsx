import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

export default function NavBarry() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link
                to="/hosting"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
              >
                Hosting
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/going"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
              >
                Going
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/pending"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
              >
                Pending
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
