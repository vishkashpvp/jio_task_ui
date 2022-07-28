/**
 * @param employeeName
 * @returns boolean indicating provided employeeName fulfills conditions
 */
function validEmployeeName(employeeName) {
  if (isEmpty(employeeName)) {
    window.alert("Employee name cannot be empty");
    return false;
  }
  if (employeeName.length < 4) {
    window.alert("Employee name should be atleast 4 characters long");
    return false;
  }
  return true;
}

/**
 * @param employeeMobile
 * @returns boolean indicating provided employeeMobile fulfills conditions
 */
function validEmployeeMobile(employeeMobile) {
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
}

/**
 * @param employeeMail
 * @returns boolean indicating provided employeeMail satisfies conditions
 */
function validEmployeeMail(employeeMail) {
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
}

/**
 * @param value
 * @returns boolean indicating provided value is empty
 */
function isEmpty(value) {
  return !value || value.length === 0;
}
