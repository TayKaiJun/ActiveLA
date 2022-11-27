import React, { useState} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import LoginPage from "./pages/Login";
import { AuthContext } from "./services/authContext";
import PostEvent from "./pages/Post-Event";
import MyEvents from "./pages/MyEvents";
import Going from "./pages/MyEvents/navbarComponents/going";
import Pending from "./pages/MyEvents/navbarComponents/pending";
import Hosting from "./pages/MyEvents/navbarComponents/hosting";
import * as authUtil from "./services/authUtil"
import SignUpPage from "./pages/Signup";

function App() {

  const [authState, setAuthState] = useState(false);

  const setupSessionInfo = (loginState, uid) => {
    setAuthState(loginState);
    authUtil.setLoginState(loginState);
    authUtil.setUserID(uid);
  };

  const getUser = () => {
    return authUtil.getUserID();
  };

  return (
    <AuthContext.Provider value={{authState, setupSessionInfo, getUser}}>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MyEvents" element={<MyEvents />} />
          <Route path="/going" element={<Going />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/PostEvent" element={<PostEvent />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
