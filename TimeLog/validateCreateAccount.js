validateCreateAccount = () => {
  let emailInput = document.getElementById("emailInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  let confirmPasswordInput = document.getElementById("confirmPasswordInput")
    .value;
  if (validateForm(emailInput, passwordInput, confirmPasswordInput)) {
    if (validateEmail(emailInput)) {
      if (validatePassword(passwordInput, confirmPasswordInput)) {
        alert("The account has been successfully created");
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

validateForm = (email, password, confirmPassword) => {
  if (email == "") {
    alert("An email address is required");
    return false;
  } else if (password == "") {
    alert("A password is required");
    return false;
  } else if (confirmPassword == "") {
    alert("You must confirm your password");
    return false;
  } else {
    return true;
  }
};

validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

validatePassword = (password, confirmPassword) => {
  let pattern = /[A-Za-z0-9_]+/;
  if (password.length >= 6 && password.length <= 15) {
    if (password == confirmPassword) {
      if (pattern.test(password)) {
        return true;
      } else {
        alert(
          "Please match the password format (Only letters, numbers, and underscores)"
        );
        return false;
      }
    } else {
      alert("Passwords do not match");
      return false;
    }
  } else {
    alert("The password must have a length between 6 and 15 characters");
    return false;
  }
};
