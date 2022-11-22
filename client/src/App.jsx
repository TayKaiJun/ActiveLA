import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Activities from "./pages/Activities";
import { AuthProvider } from "./services/authContext";
import PostEvent from "./pages/Post-Event";
import MyEvents from "./pages/MyEvents";
import Going from "./pages/MyEvents/navbarComponents/going";
import Pending from "./pages/MyEvents/navbarComponents/pending";
import Hosting from "./pages/MyEvents/navbarComponents/hosting";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/MyEvents" element={<MyEvents />} />
          <Route path="/going" element={<Going />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/PostEvent" element={<PostEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
