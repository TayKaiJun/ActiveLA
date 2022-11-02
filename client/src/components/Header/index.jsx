import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

const PATHS = {
  Explore: "/",
  Activities: "/activities",
  Profile: "/profile",
  PostEvent: "/postevent",
};

function Header() {
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Active LA</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={location.pathname}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            {Object.keys(PATHS).map((pageName) => (
              <Nav.Link key={PATHS[pageName]} eventKey={PATHS[pageName]}>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to={PATHS[pageName]}
                >
                  {pageName}
                </Link>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
