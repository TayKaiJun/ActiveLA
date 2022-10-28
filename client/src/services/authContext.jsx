import React, { useState, createContext, useMemo } from "react";

const AuthContext = createContext();

// Wraps all components to provide the login state of a user.
// Can be used to render different components depending on log in state.
export function AuthProvider ({ children }){
  const [authState, setAuthState] = useState(false);

  const toggleAuthState = (state) => {
   setAuthState(state)
  };

  const auth = useMemo(() => ({authState, toggleAuthState}), [authState])

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;