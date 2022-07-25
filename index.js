let usermail = document.getElementById("usermail");
let password = document.getElementById("password");

usermail.value = "2@RIL.Com";
password.value = "123456";

/**
 * send to home route if successful
 */
login = () => {
  if (validMail(usermail.value) && validPassword(password.value)) {
    console.log("hurray!");
    localStorageSetItem("mail", usermail.value);
    localStorageSetItem("password", password.value);
    localStorageSetItem("isSignedIn", true);
    window.location.href = "home.html";
  }
};

/**
 * @param mail
 * @returns boolean indicating provided mail satisfies conditions
 */
validMail = (mail) => {
  if (!mail.toLowerCase().endsWith("@ril.com")) {
    window.alert("invalid mail");
    console.log("invalid mail");
    return false;
  }
  return true;
};

/**
 * @param password
 * @returns boolean indicating provided password fullfills conditions
 */
validPassword = (password) => {
  if (password.length < 6) {
    window.alert("min 6 chars req for password");
    console.log("min 6 chars req for password");
    return false;
  }
  return true;
};

/**
 * @param key
 * @param value
 * sets value in local storage with provided key
 */
localStorageSetItem = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * @param key
 * @returns value of local storage item with the key
 */
localStorageGetItem = (key) => {
  return localStorage.getItem(key);
};
