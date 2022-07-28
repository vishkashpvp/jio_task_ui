/**
 * @param username
 * @returns boolean indicating provided username fulfills conditions
 */
function validName(username) {
  if (isEmpty(username)) {
    window.alert("Username cannot be empty");
    return false;
  }
  if (username.length < 4) {
    window.alert("Username should be at least 4 characters long");
    return false;
  }
  return true;
}

/**
 * @param usermail
 * @returns boolean indicating provided usermail satisfies conditions
 */
function validMail(usermail) {
  if (isEmpty(usermail)) {
    window.alert("Usermail cannot be empty");
    return false;
  }
  if (!usermail.toLowerCase().endsWith("@ril.com")) {
    window.alert("Invalid mail format provided");
    return false;
  }
  return true;
}

/**
 * @param password
 * @returns boolean indicating provided password satisfies conditions
 */
function validPassword(password) {
  if (isEmpty(password)) {
    window.alert("Password cannot be empty");
    return false;
  }
  if (password.length < 6) {
    window.alert("Password length shouldn't be lesser than 6");
    return false;
  }
  return true;
}

/**
 * @param password
 * @param confirm_text
 * @returns boolean indicating provided password and confirm_text matches
 */
function passwordConfirmed(password, confirm_text) {
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
}

/**
 * @param value
 * @returns boolean indicating provided value is empty
 */
function isEmpty(value) {
  return !value || value.length === 0;
}
