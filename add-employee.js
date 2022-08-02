document.title = "Add New Employee";

let emp_image_file = document.getElementById("emp-img-file");
let emp_image = document.getElementById("emp-img");
let employee_name = document.getElementById("employee_name");
let employee_mobile = document.getElementById("employee_mobile");
let employee_mail = document.getElementById("employee_mail");
let employee_tech = document.getElementById("tech-select");
const minusOne = -1;

employee_name.value = "amas";
employee_mail.value = "amas@gmail.com";

const employee = {
  name: String,
  mail: String,
  mobile: Number,
  tech: String,
  image: String,
  user_mail: String,
};

function previewImage(imageFile) {
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      emp_image.src = reader.result;
      let newEmployeeImage = reader.result;
      localStorageSetItem("tempImg", newEmployeeImage);
    },
    false
  );

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
}

addEmployee = () => {
  if (!validEmployeeDetails()) {
    console.log("invalid employee details");
  } else {
    let new_mail = employee_mail.value;

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
    new_employee.image = localStorageGetItem("tempImg");
    new_employee.user_mail = getCurrentUser().mail;

    localStorageRemoveItem("tempImg");

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
  return employees.filter((employee) => {
    return (
      employee.user_mail.toLowerCase() === getCurrentUser().mail.toLowerCase()
    );
  });
};

/**
 * adds employee to employees array in local storage
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
  return (
    validEmployeeName(employee_name.value) &&
    validEmployeeMail(employee_mail.value) &&
    validEmployeeMobile(employee_mobile.value)
  );
};

/**
 * @returns current user object from local storage
 */
const getCurrentUser = () => {
  return JSON.parse(localStorageGetItem("currentUser"));
};
