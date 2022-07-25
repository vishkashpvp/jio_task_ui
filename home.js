/**
 * if not logged in, send to sign-in page
 */
isValidAttempt();

currentUser = getCurrentUser();

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
 *
 * @param key
 * @returns value of local storage item with the key
 */
function localStorageGetItem(key) {
  console.log(key, localStorage.getItem(key));
  return localStorage.getItem(key);
}

/*
route back to signin page
*/
function isValidAttempt() {
  if (localStorageGetItem("isSignedIn") !== "true") {
    window.location.href = "index.html";
  }
}
