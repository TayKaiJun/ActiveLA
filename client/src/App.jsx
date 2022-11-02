import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Activities from "./pages/Activities";
import PostEvent from "./pages/Post-Event";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/PostEvent" element={<PostEvent/>} />
      </Routes>
    </Router>
  );
}

export default App;
