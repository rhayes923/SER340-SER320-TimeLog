validateLogin = () => {
  let emailInput = document.getElementById("emailInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  if (validateForm(emailInput, passwordInput)) {
    if (validateEmail(emailInput)) {
      if (validatePassword(emailInput, passwordInput)) {
        return true;
      } else {
        return false;
      }
    } else {
      alert("Please enter a valid email address");
      return false;
    }
  } else {
    return false;
  }
};
validateForm = (email, password) => {
  if (email == "") {
    alert("An email address is required");
    return false;
  } else if (password == "") {
    alert("A password is required");
    return false;
  } else {
    return true;
  }
};

validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

validatePassword = (email, password) => {
  if (email == "student@qu.edu" && password == "student") {
    alert("The user has successfully logged in");
    document.getElementById("loginForm").action = "studentPage.html";
    return true;
  } else if (email == "faculty@qu.edu" && password == "faculty") {
    alert("The user has successfully logged in");
    document.getElementById("loginForm").action = "facultyPage.html";
    return true;
  } else {
    alert("The login information is invalid");
    return false;
  }
};
