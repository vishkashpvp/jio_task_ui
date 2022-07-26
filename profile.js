currentUser = getCurrentUser();

document.title = "Profile - " + currentUser.name;

username = document.getElementById("username");
usermail = document.getElementById("usermail");
password = document.getElementById("password");

username.value = currentUser.name;
usermail.value = currentUser.mail;
password.value = currentUser.password;

const user = {
  name: String,
  mail: String,
  password: String,
};

updateCurrentUser = () => {
  if (!validSaveDetails()) {
    console.log("invalid details provided");
  } else {
    updated_user = Object.create(user);
    updated_user.name = username.value;
    updated_user.mail = usermail.value;
    updated_user.password = password.value;

    updateLocalUser(updated_user);

    window.location.href = "home.html";
  }
};

/**
 * @returns current user object from local storage
 */
function getCurrentUser() {
  currentUser = localStorageGetItem("currentUser");
  currentUser = JSON.parse(currentUser);
  return currentUser;
}

/**
 * @returns users array from the local storage
 */
getLocalUsers = () => {
  let users = localStorageGetItem("users");
  return users ? JSON.parse(users) : [];
};

/**
 * @param user
 * updates user to users array in local storage
 */
updateLocalUser = (current_user) => {
  let users = getLocalUsers();

  local_user = users.find((user) => {
    return user.mail == current_user.mail;
  });

  local_user.name = current_user.name;
  local_user.password = current_user.password;

  local_user = JSON.stringify(local_user);
  users = JSON.stringify(users);
  localStorageSetItem("currentUser", local_user);
  localStorageSetItem("users", users);
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
function localStorageGetItem(key) {
  console.log(key, localStorage.getItem(key));
  return localStorage.getItem(key);
}

/**
 * @returns boolean indicating provided details all satifies conditions
 */
validSaveDetails = () => {
  if (validName(username.value) && validPassword(password.value)) {
    return true;
  }
  return false;
};

/**
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
 * @param value
 * @returns boolean indicating provided value is empty
 */
isEmpty = (value) => {
  return !value || value.length === 0;
};
