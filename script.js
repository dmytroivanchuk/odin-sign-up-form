const form = document.querySelector("#form");
const inputs = document.querySelectorAll("#form input");

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const error = input.nextElementSibling;
    switch (input.id) {
      case "first-name":
      case "last-name":
      case "email":
      case "phone-number":
        if (input.validity.valid) {
          error.textContent = "Error";
          error.className = "error";
        } else {
          showError(input, error);
        }
        break;
      case "password":
      case "confirm-password":
        const password = document.querySelector("#password");
        const passwordError = password.nextElementSibling;
        const confirmPassword = document.querySelector("#confirm-password");
        const confirmPasswordError = confirmPassword.nextElementSibling;
        if (password.value === confirmPassword.value) {
          password.setCustomValidity("");
          passwordError.textContent = "Error";
          passwordError.className = "error";
          confirmPassword.setCustomValidity("");
          confirmPasswordError.textContent = "Error";
          confirmPasswordError.className = "error";
        } else {
          password.setCustomValidity("Invalid");
          showError(password, passwordError);
          confirmPassword.setCustomValidity("Invalid");
          showError(confirmPassword, confirmPasswordError);
        }
        break;
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formValid = true;

  for (let i = 0; i < inputs.length; i++) {
    const currentInput = inputs[i];
    if (!currentInput.validity.valid) {
      const error = currentInput.nextElementSibling;
      showError(currentInput, error);

      if (formValid) {
        formValid = false;
      }
    }
  }

  if (formValid) {
    form.submit();
  }
});

function showError(input, error) {
  switch (input.id) {
    case "first-name":
      if (input.validity.valueMissing) {
        error.textContent = "Please, enter your first name.";
      }
      break;
    case "last-name":
      if (input.validity.valueMissing) {
        error.textContent = "Please, enter your last name.";
      }
      break;
    case "email":
      if (input.validity.valueMissing) {
        error.textContent = "Please, enter your email address.";
      } else if (input.validity.typeMismatch) {
        error.textContent = "Please, enter valid email address.";
      }
      break;
    case "phone-number":
      if (input.validity.typeMismatch) {
        error.textContent = "Please, enter valid phone number.";
      }
      break;
    case "password":
    case "confirm-password":
      error.textContent = "Passwords do not match.";
  }

  error.className = "error-active";
}
