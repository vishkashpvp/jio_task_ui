const current_employee = getCurrentEmployee();

let emp_name = document.getElementById("employee_name");
let emp_mail = document.getElementById("employee_mail");
let emp_mobile = document.getElementById("employee_mobile");
let emp_tech = document.getElementById("tech_select");
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

    let current_employees = getCurrentUserEmployees();
    let index_mail = current_employees.findIndex((temp_employee) => {
      return (
        updated_employee.mail.toLowerCase() ===
          temp_employee.mail.toLowerCase() &&
        current_employee.mail.toLowerCase() !== temp_employee.mail.toLowerCase()
      );
    });

    if (index_mail !== minusOne) {
      window.alert("Employee already exists");
      return;
    }

    let all_employees = getAllEmployees();
    let index = all_employees.findIndex((temp_employee) => {
      return JSON.stringify(temp_employee) === JSON.stringify(current_employee);
    });

    if (index !== minusOne) {
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
function getAllEmployees() {
  let employees = localStorageGetItem("employees");
  return employees ? JSON.parse(employees) : [];
}

/**
 * @returns employees of current user from local storage
 */
function getCurrentUserEmployees() {
  let employees = getAllEmployees();
  let currentUserEmployees = employees.filter((employee) => {
    return employee.user_mail === getCurrentUser().mail;
  });
  return currentUserEmployees;
}

/**
 * @returns boolean indicating satisfying condtions
 */
validEmployeeDetails = () => {
  return (
    validEmployeeName(emp_name.value) &&
    validEmployeeMail(emp_mail.value) &&
    validEmployeeMobile(emp_mobile.value)
  );
};

/**
 * @returns current employee object from local storage
 */
function getCurrentEmployee() {
  return JSON.parse(localStorageGetItem("currentEmployee"));
}

/**
 * @returns current user object from local storage
 */
function getCurrentUser() {
  return JSON.parse(localStorageGetItem("currentUser"));
}
