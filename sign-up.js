username = document.getElementById("username");
usermail = document.getElementById("usermail");
password = document.getElementById("password");
confirm_password = document.getElementById("confirm-password");
const minusOne = -1;

username.value = "Vish";
usermail.value = "v@RIL.Com";
password.value = "123456";
confirm_password.value = "123456";

const user = {
  name: String,
  mail: String,
  password: String,
};

/**
 * route to home if succesful signup else show what's wrong
 */
signUp = () => {
  if (!vaildSignUpDetails()) {
    console.log("OHH GOD! invalid signup details");
  } else {
    new_mail = usermail.value;
    let mail_index = getLocalUsers().findIndex((user) => {
      return user.mail.toLowerCase() === new_mail.toLowerCase();
    });

    if (mail_index !== minusOne) {
      console.log("Mail already exists");
      window.alert("Mail already exists");
      return;
    }

    const newUser = Object.create(user);
    newUser.name = username.value;
    newUser.mail = usermail.value;
    newUser.password = password.value;

    setLocalUser(newUser);

    localStorageSetItem("isSignedIn", true);
    window.location.href = "home.html";
  }
};

/**
 * @returns users array from the local storage
 */
getLocalUsers = () => {
  let users = localStorageGetItem("users");
  return users ? JSON.parse(users) : [];
};

/**
 * @param user
 * adds user to users array in local storage
 */
setLocalUser = (user) => {
  let users = getLocalUsers();
  users.push(user);
  localStorageSetItem("number of users", users.length);
  user = JSON.stringify(user);
  users = JSON.stringify(users);
  localStorageSetItem("currentUser", user);
  localStorageSetItem("users", users);
};

/**
 * @returns boolean indicating provided deatails all satifies conditions
 */
vaildSignUpDetails = () => {
  if (
    validName(username.value) &&
    validMail(usermail.value) &&
    validPassword(password.value) &&
    passwordConfirmed(password.value, confirm_password.value)
  ) {
    return true;
  }
  return false;
};

/**
 *
 * @param username
 * @returns boolean indicating provided username fulfills conditions
 */
validName = (username) => {
  if (isEmpty(username)) {
    window.alert("Username cannot be empty");
    return false;
  }
  if (username.length < 4) {
    window.alert("Username should be atleast 4 characters long");
    return false;
  }
  return true;
};

/**
 * @param usermail
 * @returns boolean indicating provided usermail satisfies conditions
 */
validMail = (usermail) => {
  if (isEmpty(usermail)) {
    window.alert("Usermail cannot be empty");
    return false;
  }
  if (!usermail.toLowerCase().endsWith("@ril.com")) {
    window.alert("Invalid mail format provided");
    return false;
  }
  return true;
};

/**
 * @param password
 * @returns boolean indicating provided password satisfies conditions
 */
validPassword = (password) => {
  if (isEmpty(password)) {
    window.alert("Password cannot be empty");
    return false;
  }
  if (password.length < 6) {
    window.alert("Password length shouldn't be lesser than 6");
    return false;
  }
  return true;
};

/**
 * @param password
 * @param confirm_text
 * @returns boolean indicating provided password and confirm_text matches
 */
passwordConfirmed = (password, confirm_text) => {
  if (isEmpty(password)) {
    window.alert("Password is not provided");
    return false;
  }
  if (isEmpty(confirm_text)) {
    window.alert("Confirm Password is not provided");
    return false;
  }
  if (confirm_text !== password) {
    window.alert("Passwords do not match");
    return false;
  }
  return true;
};

/**
 * @param value
 * @returns boolean indicating provided value is empty
 */
isEmpty = (value) => {
  return !value || value.length === 0;
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
