/**
 * if not logged in, send to sign-in page
 */
isValidAttempt();

currentUser = getCurrentUser();
currentUserEmployees = getCurrentUserEmployees();

document.title = "Home - " + currentUser.name;
document.querySelector("#name_span").textContent = currentUser.name;
document.querySelector("#mail_span").textContent = currentUser.mail;

/**
 * @returns current user object from local storage
 */
function getCurrentUser() {
  currentUser = localStorageGetItem("currentUser");
  currentUser = JSON.parse(currentUser);
  return currentUser;
}

/**
 * @returns employees of current user from local storage
 */
function getCurrentUserEmployees() {
  let employees = localStorageGetItem("employees");
  employees = employees ? JSON.parse(employees) : [];
  currentUserEmployees = employees.filter((employee) => {
    return employee.user_mail === getCurrentUser().mail;
  });
  localStorageSetItem(
    "currentUserEmployees",
    JSON.stringify(currentUserEmployees)
  );
  localStorageSetItem("currentUserEmployeesCount", currentUserEmployees.length);
  return currentUserEmployees;
}

/**
 *
 * @param key
 * @returns value of local storage item with the key
 */
function localStorageGetItem(key) {
  return localStorage.getItem(key);
}

/**
 * sets value in local storage with provided key
 * @param key
 * @param value
 */
function localStorageSetItem(key, value) {
  localStorage.setItem(key, value);
}

/**
 * removes given key in the local storage
 * @param key
 */
function localStorageRemoveItem(key) {
  localStorage.removeItem(key);
}

/**
 * route back to signin page
 */
function isValidAttempt() {
  if (localStorageGetItem("isSignedIn") !== "true") {
    window.location.href = "index.html";
  }
}

/**
 * routes to signin page
 */
function logout() {
  clearCurrentUserDetails();
  localStorageSetItem("isSignedIn", false);
  window.location.href = "index.html";
}

/**
 * clears keys related to current user
 */
function clearCurrentUserDetails() {
  localStorageRemoveItem("currentUser");
  localStorageRemoveItem("currentUserEmployees");
  localStorageRemoveItem("currentUserEmployeesCount");
}
