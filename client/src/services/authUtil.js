import bcrypt from "bcryptjs";

// Utility functions that to interact with session storage &
// uses bcrypt to compare the hashed loginState

export function setLoginState(state) {
  bcrypt
    .hash(state ? "true" : "false", 10)
    .then((hashedState) => {
      sessionStorage.setItem("loginState", hashedState);
    })
    .catch(() => {
      console.log("loginState not hashed successfully");
    });
}

export function getLoginState() {
  bcrypt
    .compare(sessionStorage.getItem("loginState"), "true")
    .then((loginCheck) => {
      return loginCheck;
    })
    .catch(() => {
      console.log("hash does not match");
    });
}

export function setUserID(uid) {
  if (uid.length > 0) {
    sessionStorage.setItem("userID", uid);
  } else {
    sessionStorage.removeItem("userID");
  }
}

export function getUserID() {
  return sessionStorage.getItem("userID");
}
