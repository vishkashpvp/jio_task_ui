/**
 * if not logged in, send to sign-in page
 */
isValidAttempt();

currentUser = getCurrentUser();
currentUserEmployees = getCurrentUserEmployees();

document.title = "Home - " + currentUser.name;
document.querySelector("#name_span").textContent = currentUser.name;
document.querySelector("#mail_span").textContent = currentUser.mail;
let employees_table = document.getElementById("employees_table");

setEmployeesDataTable();

/**
 * sets current user employees data to table in html
 */
function setEmployeesDataTable() {
  employees_table.width = "100%";
  employees_table.border = "2px solid black";

  currentUserEmployees.forEach((employee) => {
    let tr = employees_table.insertRow();
    let name = tr.insertCell();
    let mail = tr.insertCell();
    let mobile = tr.insertCell();
    let tech = tr.insertCell();
    let action = tr.insertCell();

    name.align = "center";
    mail.align = "center";
    mobile.align = "center";
    tech.align = "center";
    action.align = "center";

    edit_button = document.createElement("button");
    edit_button.innerHTML = "edit";
    edit_button.onclick = function () {
      editEmployee(employee);
    };
    delete_button = document.createElement("button");
    delete_button.innerHTML = "delete";
    delete_button.onclick = function () {
      deleteEmployee(employee);
    };

    name.appendChild(document.createTextNode(employee.name));
    mail.appendChild(document.createTextNode(employee.mail));
    mobile.appendChild(document.createTextNode(employee.mobile));
    tech.appendChild(document.createTextNode(employee.tech));
    action.appendChild(edit_button);
    action.appendChild(delete_button);
  });
}

/**
 * edit employee details
 * @param employee
 */
function editEmployee(employee) {
  console.log(employee);
}

/**
 * delete employee from employees array
 * @param employee
 */
function deleteEmployee(employee) {
  console.log("deletingg...");
  console.log(employee);
}

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
