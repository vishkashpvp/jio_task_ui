let username = document.getElementById("username");
let usermail = document.getElementById("usermail");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
const minusOne = -1;

username.value = "Vish";
usermail.value = "v@RIL.Com";
password.value = "123456";
confirm_password.value = "123456";

const user = {
  name: String,
  mail: String,
  password: String,
};

/**
 * route to home if succesful signup else show what's wrong
 */
signUp = () => {
  if (!validSignUpDetails()) {
    console.log("OHH GOD! invalid signup details");
  } else {
    let new_mail = usermail.value;
    let mail_index = getLocalUsers().findIndex((user) => {
      return user.mail.toLowerCase() === new_mail.toLowerCase();
    });

    if (mail_index !== minusOne) {
      console.log("Mail already exists");
      window.alert("Mail already exists");
      return;
    }

    const newUser = Object.create(user);
    newUser.name = username.value;
    newUser.mail = usermail.value;
    newUser.password = password.value;

    setLocalUser(newUser);

    localStorageSetItem("isSignedIn", true);
    window.location.href = "home.html";
  }
};

/**
 * @returns users array from the local storage
 */
getLocalUsers = () => {
  let users = localStorageGetItem("users");
  return users ? JSON.parse(users) : [];
};

/**
 * @param user
 * adds user to users array in local storage
 */
setLocalUser = (user) => {
  let users = getLocalUsers();
  users.push(user);
  localStorageSetItem("usersCount", users.length);
  user = JSON.stringify(user);
  users = JSON.stringify(users);
  localStorageSetItem("currentUser", user);
  localStorageSetItem("users", users);
};

/**
 * @returns boolean indicating provided deatails all satifies conditions
 */
validSignUpDetails = () => {
  return (
    validName(username.value) &&
    validMail(usermail.value) &&
    validPassword(password.value) &&
    passwordConfirmed(password.value, confirm_password.value)
  );
};
