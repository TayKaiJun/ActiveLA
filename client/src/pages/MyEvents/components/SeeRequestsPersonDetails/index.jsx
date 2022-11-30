import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { acceptJoinRequest, getUserByID } from "../../../../services";
import notify from "../../../../components/CustomToast";

function PersonDetails(props) {
  const navigate = useNavigate();
  const { event } = props;
  const userIDs = event.pendingAccept;
  const eventID = event.id;

  const [userlist, setUserList] = useState([]);

  const generateUsers = async () => {
    const promises = [];
    for (let x = 0; x < userIDs.length; x += 1) {
      const id = userIDs[x];
      // fill promises array with promises
      promises.push(getUserByID(id));
    }
    // await all promises in array to become unprocessed data
    const unprocessedUsers = await Promise.all(promises);
    // process data in each slot
    const processedUsers = unprocessedUsers.map((value) => value.data.User);
    console.log(processedUsers);
    setUserList(processedUsers);
  };

  useEffect(() => {
    generateUsers();
  }, []);

  const handleDecline = (uid) => {};

  const handleAccept = (uid) => {
    acceptJoinRequest(uid, eventID)
      .then((res) => {
        navigate(0);
        console.log(uid);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Accordion>
      {userlist ? (
        userlist.map((user) => (
          <Accordion.Item eventKey={user}>
            <Accordion.Header>{user.name}</Accordion.Header>
            <AccordionBody>
              <p>About: {user.about}</p>
              <p>Email: {user.email}</p>
              <p>Pronouns: {user.pronouns}</p>
              <Button variant="success" onClick={(e) => handleAccept(user.id)}>
                Accept
              </Button>{" "}
              <Button variant="danger" onClick={handleDecline}>
                Decline
              </Button>
            </AccordionBody>
          </Accordion.Item>
        ))
      ) : (
        <Accordion.Item />
      )}
    </Accordion>
  );
}

export default PersonDetails;
