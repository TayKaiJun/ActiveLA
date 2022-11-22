import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PageLayout from "../../components/PageLayout";
import Pending from "./navbarComponents/pending";
import Hosting from "./navbarComponents/hosting";
import Going from "./navbarComponents/going";
import Navbarry from "./Navbar";

function MyEvents() {
  return (
    <PageLayout>
      <Navbarry />
    </PageLayout>
  );
}

export default MyEvents;
