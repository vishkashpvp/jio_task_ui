/**
 * if not logged in, send to sign-in page
 */
isValidAttempt();

const currentUser = getCurrentUser();
const currentUserEmployees = getCurrentUserEmployees();

document.title = "Home - " + currentUser.name;
document.querySelector("#name_span").textContent = currentUser.name;
let employees_table = document.getElementById("employees_table");
const minusOne = -1;

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
    let image = tr.insertCell();
    let mail = tr.insertCell();
    let mobile = tr.insertCell();
    let tech = tr.insertCell();
    let action = tr.insertCell();

    name.align = "center";
    image.align = "center";
    mail.align = "center";
    mobile.align = "center";
    tech.align = "center";
    action.align = "center";

    let edit_button = document.createElement("button");
    edit_button.innerHTML = "edit";
    edit_button.style.marginRight = "10px";
    edit_button.className = "btn btn-outline-primary";
    edit_button.onclick = function () {
      editEmployee(employee);
    };
    let delete_button = document.createElement("button");
    delete_button.innerHTML = "delete";
    delete_button.className = "btn btn-outline-danger";
    delete_button.onclick = function () {
      deleteEmployee(employee);
    };

    let imxg = document.createElement("img");
    imxg.style.width = "50px";
    imxg.style.height = "50px";
    imxg.src = employee.image ? employee.image : "add-image.png";
    image.appendChild(imxg);

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
  localStorageSetItem("currentEmployee", JSON.stringify(employee));
  window.location.href = "edit-employee.html";
}

/**
 * delete employee from employees array
 * @param employee
 */
function deleteEmployee(employee) {
  let all_employees = getAllEmployees();
  let index = all_employees.findIndex((temp_employee) => {
    return (
      temp_employee.user_mail.toLowerCase() ===
        currentUser.mail.toLowerCase() &&
      temp_employee.mail.toLowerCase() === employee.mail.toLowerCase()
    );
  });
  if (index !== minusOne) {
    all_employees.splice(index, 1);
    updateAllEmployees(all_employees);
    window.location.reload();
  }
}

/**
 * @returns current user object from local storage
 */
function getCurrentUser() {
  return JSON.parse(localStorageGetItem("currentUser"));
}

/**
 * @returns employees of current user from local storage
 */
function getCurrentUserEmployees() {
  let employees = getAllEmployees();
  let currentUserEmployees = employees.filter((employee) => {
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
 * @returns employees array from local storage of all users
 */
function getAllEmployees() {
  let employees = localStorageGetItem("employees");
  return employees ? JSON.parse(employees) : [];
}

/**
 * replaces employees array with new array
 * @param employees
 */
function updateAllEmployees(employees) {
  localStorageSetItem("employeesCount", employees.length);
  localStorageSetItem("employees", JSON.stringify(employees));
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
