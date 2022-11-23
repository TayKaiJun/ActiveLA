import React, { useState, createContext } from "react";
import * as authUtil from "./authUtil";

export const AuthContext = createContext({
  authState: false,
  setupSessionInfo: (userID) => {},
  getUser: () => {},
});

export default AuthContext;
