document.title = "Add New Employee";

employee_name = document.getElementById("employee_name");
employee_mobile = document.getElementById("employee_mobile");
employee_mail = document.getElementById("employee_mail");
employee_tech = document.getElementById("tech-select");
const minusOne = -1;

employee_name.value = "amas";
employee_mail.value = "amas@gmail.com";

const employee = {
  name: String,
  mail: String,
  mobile: Number,
  tech: String,
  user_mail: String,
};

addEmployee = () => {
  if (!validEmployeeDetails()) {
    console.log("invalid employee details");
  } else {
    new_mail = employee_mail.value;

    let mail_index = getCurrentUserEmployees().findIndex((employee) => {
      return employee.mail.toLowerCase() === new_mail.toLowerCase();
    });

    if (mail_index !== minusOne) {
      console.log("Employee mail already exists");
      window.alert("Employee mail already exists");
      return;
    }

    let new_employee = Object.create(employee);

    new_employee.name = employee_name.value;
    new_employee.mail = employee_mail.value;
    new_employee.mobile = parseInt(employee_mobile.value);
    new_employee.tech = employee_tech.value;
    new_employee.user_mail = getCurrentUser().mail;

    setEmployee(new_employee);

    window.location.href = "home.html";
  }
};

/**
 * @returns employees array from local storage of all users
 */
getAllEmployees = () => {
  let employees = localStorageGetItem("employees");
  return employees ? JSON.parse(employees) : [];
};

/**
 * @returns employees of curent user from local storage
 */
getCurrentUserEmployees = () => {
  let employees = getAllEmployees();
  currentUserEmployees = employees.filter((employee) => {
    return employee.user_mail === getCurrentUser().mail;
  });
  return currentUserEmployees;
};

/**
 * adds employee to employees array of current user
 * and employees array of all users
 * in local storage
 * @param employee
 */
setEmployee = (employee) => {
  let employees = getAllEmployees();
  employees.push(employee);
  localStorageSetItem("employeesCount", employees.length);
  employees = JSON.stringify(employees);
  localStorageSetItem("employees", employees);
};

/**
 * @returns boolean indicating satisfying condtions
 */
validEmployeeDetails = () => {
  if (
    validEmployeeName(employee_name.value) &&
    validEmployeeMail(employee_mail.value) &&
    validEmployeeMobile(employee_mobile.value)
  ) {
    return true;
  }
  return false;
};

/**
 * @param employeeName
 * @returns boolean indicating provided employeeName fulfills conditions
 */
validEmployeeName = (employeeName) => {
  if (isEmpty(employeeName)) {
    window.alert("Employee name cannot be empty");
    return false;
  }
  if (employeeName.length < 4) {
    window.alert("Employee name should be atleast 4 characters long");
    return false;
  }
  return true;
};

/**
 * @param employeeMobile
 * @returns boolean indicating provided employeeMobile fulfills conditions
 */
validEmployeeMobile = (employeeMobile) => {
  if (isEmpty(employeeMobile)) {
    window.alert("Employee mobile cannot be empty");
    return false;
  }
  if (isNaN(parseInt(employeeMobile))) {
    window.alert("Mobile number should contain only munerical values");
    return false;
  }
  if (employeeMobile.length !== 10) {
    window.alert("Employee mobile should be 10 characters");
    return false;
  }
  return true;
};

/**
 * @param employeeMail
 * @returns boolean indicating provided employeeMail satisfies conditions
 */
validEmployeeMail = (employeeMail) => {
  if (isEmpty(employeeMail)) {
    window.alert("Employee mail cannot be empty");
    return false;
  }
  if (
    !employeeMail.toLowerCase().endsWith("@ril.com") &&
    !employeeMail.toLowerCase().endsWith("@gmail.com")
  ) {
    window.alert("Invalid mail format provided");
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
function localStorageGetItem(key) {
  return localStorage.getItem(key);
}

/**
 * @returns current user object from local storage
 */
const getCurrentUser = () => {
  return JSON.parse(localStorageGetItem("currentUser"));
};
