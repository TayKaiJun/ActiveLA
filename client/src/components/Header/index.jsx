import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SignupButton from "../SignupButton";
import LoginModal from "../LoginModal";
import AuthContext from "../../services/authContext";

const PATHS = {
  Explore: "/",
  Activities: "/activities",
  Profile: "/profile",
  PostEvent: "/postevent",
};

function Header() {
  const location = useLocation();
  const {authState, toggleAuthState} = useContext(AuthContext)

  const signOut = () => {
    toggleAuthState(false)
  }
  
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
          {
            authState ? 
            <Button onClick={signOut}> Sign out </Button> :
            <>
              <LoginModal />
              <SignupButton />
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
