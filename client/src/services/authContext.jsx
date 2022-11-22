import React, { useState, createContext } from "react";

const AuthContext = createContext();

// Wraps all components to provide the login state of a user.
// Can be used to render different components depending on log in state.
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(false);

  // TODO: broken, does not actually log the user out though the sessionStorage updates
  const toggleAuthState = (uid) => {
    if (uid.length > 0) {
      setAuthState(true);
      sessionStorage.setItem("loginState", true);
      sessionStorage.setItem("currentUser", uid);
    } else {
      setAuthState(false);
      sessionStorage.setItem("loginState", false);
      sessionStorage.setItem("currentUser", null);
    }
  };

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
