import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import SignupButton from "../SignupButton";
import LoginModal from "../LoginModal";
import AuthContext from "../../services/authContext";
import notify from "../CustomToast";

const PATHS = {
  "Explore": "/",
  "Profile": "/profile",
  "Host an event": "/postevent",
  "My events": "/MyEvents",
};

function Header() {

  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [authState, setAuthState] = useState(authContext.authState());
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const callRefresh = () => {
    console.log("called")
    setRefresh(refresh + 1);
  }
  
  const signOut = () => {
    notify("Successfully signed out", "success");
    authContext.setupSessionInfo(false, "");
    navigate("/");
    setAuthState(false);
  };

  useEffect(() => {
    const state = authContext.authState();
    console.log(state)
    setAuthState(state)
  }, [])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Button style={{color: "black", backgroundColor: "transparent", border: "none"}} onClick={() => navigate('/')}>
          <h3>
            ActiveLA
          </h3>
        </Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={location.pathname}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            {!authState ? (
              <>
                <LoginModal callRefresh={callRefresh}/>
                <SignupButton />
              </>
            ) : (
              <>
                {" "}
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
                <Button style={{fontWeight: "bold", color: "grey", backgroundColor: "transparent", border: "none"}} onClick={signOut}> Sign out </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
