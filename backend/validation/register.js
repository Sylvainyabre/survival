const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.password) ? data.passwordConfirm : "";

  if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First name too short.";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required.";
  }
  if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name too short.";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Password confirmation required.";
  }
  if (!validator.equals(data.passwordConfirm, data.password)) {
    errors.passwordConfirm = "Passwords do not match.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};