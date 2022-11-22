import bcrypt from "bcryptjs";

export function setLoginState(state) {
  bcrypt
    .hash((state ? "true" : "false"), 10)
    .then((hashedState) => {
      // console.log((state ? "true" : "false"));
      // console.log("Printing hashedState: ");
      // console.log(hashedState);
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
