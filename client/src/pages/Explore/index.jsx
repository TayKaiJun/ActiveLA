import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginModal from "../../components/LoginModal";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter/ExploreFilter";
import AuthContext from '../../services/authContext';

function Explore() {

  const name = "Beryl"; // Replace with useEffect to get username if logged in else show login button

  const [modalShow, setModalShow] = useState(false);

  const loginState = sessionStorage.getItem('loginState')

  const handleLoginSubmit = () => {
    console.log("Login button clicked")
  }

  return (
    <PageLayout>
      <Container>
        <Row>
          <Col sm={10}><h2>Welcome, {name} 👋</h2></Col>
          <Col sm={2}><Button variant="primary" onClick={() => setModalShow(true)}>
            Login
          </Button>
          </Col>
        </Row>
      </Container>
      <p className="mt-4">Events near you</p>
      <LoginModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={handleLoginSubmit}
      />
      <h1>{loginState ? "hi" : "bye"}</h1>
      <ExploreFilter
        onChange={(filtersState) => {
          // TODO: Make api call to update filters for explore page
          console.log(filtersState);
        }}
      />
    </PageLayout>
  );
}

export default Explore;
