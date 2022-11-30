import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import notify from "../../../../components/CustomToast";
import { deleteEvent, getRelatedEvents } from "../../../../services";
import AuthContext from "../../../../services/authContext";

function UpdateEventsFormInModal(props) {
  const navigate = useNavigate();
  const eventID = props;

  function DeleteEvent() {
    deleteEvent(eventID.eventID.eventID)
      .then((res) => {
        setTimeout(navigate(0), 10000);
      })
      .catch((err) => console.log(err.message));

    console.log("deleted the event!");
  }
  /* delete btn only */
  return (
    <button type="button" onClick={DeleteEvent} className="btn btn-danger">
      Delete Event
    </button>
  );
}

export default UpdateEventsFormInModal;
