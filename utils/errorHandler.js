const errorHandler = (error) => {
  const errorObj = {};

  if (error.message === "Incorrect email") {
    errorObj.email = "The email is not registered";
  }
  if (error.message === "Incorrect password") {
    errorObj.password = "Incorrect password";
  }

  if (error.name === "CastError") {
    errorObj.error =
      "record doesnot exists for the given id or the id is invalid";
  }

  if (error.code === 11000) {
    errorObj.email = "Please enter a unique email";
  }

  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach((item) => {
      errorObj[item.path] = item.properties.message;
    });
  }

  return errorObj;
};

module.exports = errorHandler;
