const current_employee = getCurrentEmployee();

emp_name = document.getElementById("employee_name");
emp_mail = document.getElementById("employee_mail");
emp_mobile = document.getElementById("employee_mobile");
emp_tech = document.getElementById("tech_select");
const minusOne = -1;

emp_name.value = current_employee.name;
emp_mail.value = current_employee.mail;
emp_mobile.value = current_employee.mobile;
emp_tech.value = current_employee.tech;

const employee = {
  name: String,
  mail: String,
  mobile: Number,
  tech: String,
  user_mail: String,
};

updateCurrentEmployee = () => {
  if (!validEmployeeDetails()) {
    console.log("invalid employee details");
  } else {
    let updated_employee = Object.create(employee);
    updated_employee.name = emp_name.value;
    updated_employee.mail = emp_mail.value;
    updated_employee.mobile = emp_mobile.value;
    updated_employee.tech = emp_tech.value;
    updated_employee.user_mail = current_employee.user_mail;

    let all_employees = getAllEmployees();
    let index = all_employees.findIndex((temp_employee) => {
      return JSON.stringify(temp_employee) === JSON.stringify(current_employee);
    });

    if (index != minusOne) {
      all_employees.splice(index, 1, updated_employee);
      updateAllEmployees(all_employees);
      localStorageRemoveItem("currentEmployee");
      window.location.href = "home.html";
    }
  }
};

/**
 * updates employees array in local storage with new array provided
 * @param employees
 */
function updateAllEmployees(employees) {
  localStorageSetItem("employeesCount", employees.length);
  localStorageSetItem("employees", JSON.stringify(employees));
}

/**
 * @returns employees array from local storage of all users
 */
getAllEmployees = () => {
  let employees = localStorageGetItem("employees");
  return employees ? JSON.parse(employees) : [];
};

/**
 * @returns boolean indicating satisfying condtions
 */
validEmployeeDetails = () => {
  if (
    validEmployeeName(emp_name.value) &&
    validEmployeeMail(emp_mail.value) &&
    validEmployeeMobile(emp_mobile.value)
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
 * @returns current employee object from local storage
 */
function getCurrentEmployee() {
  return JSON.parse(localStorageGetItem("currentEmployee"));
}

/**
 * @param key
 * @returns value from local storage with given key
 */
function localStorageGetItem(key) {
  return localStorage.getItem(key);
}

/**
 * @param key
 * @param value
 */
function localStorageSetItem(key, value) {
  localStorage.setItem(key, value);
}

/**
 * removes item from local storage with given key
 * @param key
 */
function localStorageRemoveItem(key) {
  localStorage.removeItem(key);
}
