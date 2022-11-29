import { createContext } from "react";

export const AuthContext = createContext({
  setupSessionInfo: (userID) => {},
  isLoggedIn: false,
  user: null,
});

export default AuthContext;
