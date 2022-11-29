import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"; // Container for rendering snackbar generated by child components that call notify()
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import LoginPage from "./pages/Login";
import { AuthContext } from "./services/authContext";
import PostEvent from "./pages/Post-Event";
import MyEvents from "./pages/MyEvents";
import { getLoginState, setLoginState, setUserID, getUserID } from "./services/authUtil";
import SignUpPage from "./pages/Signup";
import EditProfile from "./pages/Profile/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const setupSessionInfo = (loginState, uid) => {
    setLoginState(loginState)
      .then(() => {
        setUserID(uid);
      })
      .then(() => {
        setRefresh((prevState) => prevState + 1);
      });
  };

  useEffect(() => {
    setIsLoggedIn(getLoginState());
    setUser(getUserID());
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ setupSessionInfo, user, isLoggedIn }}>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/post-event" element={<PostEvent />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
