import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageLayout from "../../components/PageLayout";
import { getUserByID } from "../../services/index";
import AuthContext from "../../services/authContext";
import EditProfile from "./EditProfile";

function Profile() {
  const userID = useContext(AuthContext).getUser();
  const [data, setData] = useState({
    username: "",
    email: "",
    name: "",
    pronouns: "",
    about: "",
    interests: [],
    password: "",
  });

  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!editing);

  useEffect(() => {
    getUserByID(userID)
      .then((res) => {
        // const userData = new Map(Object.entries(res.data.User));
        // console.log(userData);
        setData(res.data.User);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <PageLayout>
      <h1>{data.name}&apos;s Profile</h1>

      {!editing ? (
        <Card style={{ width: "60rem", marginLeft: "auto", marginRight: "auto" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  Username
                </Col>
                <Col>{data.username}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  Email
                </Col>
                <Col>{data.email}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  Name
                </Col>
                <Col>{data.name}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  Pronouns
                </Col>
                <Col>{data.pronouns}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  About
                </Col>
                <Col>{data.about}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col sm={3} style={{ fontWeight: "bold" }}>
                  Interests
                </Col>
                <Col>{data.interests}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Button className="ms-2 btn btn-primary" variant="primary" onClick={toggleEditing}>
            Edit
          </Button>
        </Card>
      ) : (
        <>
          <Button className="ms-2 btn btn-primary" variant="primary" type='submit' onClick={toggleEditing}>
            Submit
          </Button>
          <Button className="ms-2 btn btn-primary" variant="secondary" onClick={toggleEditing}>
            Cancel
          </Button>
        </>
      )}
    </PageLayout>
  );
}

export default Profile;
