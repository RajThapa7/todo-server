const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const errorHandler = require("../utils/errorHandler");

const createToken = (data, csrfToken) => {
  const accessToken = jwt.sign(
    JSON.stringify({
      email: data.email,
      id: data._id,
      name: data.name,
      csrfToken,
    }),
    "secret_key"
  );
  return accessToken;
};

const loginPost = async (req, res) => {
  const csrfToken = uuidv4();
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ email: "email is required" });
  }
  if (!password) {
    return res.status(400).json({ password: "password is required" });
  }
  try {
    const user = await User.login(email, password);
    const accessToken = createToken(user, csrfToken);
    res.header("X-CSRF-TOKEN", csrfToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, //time in milliseconds
    });
    res.json({ msg: "Successfully Logged in!" });
  } catch (error) {
    const errorMsg = errorHandler(error);
    res.status(400).json(errorMsg);
  }
};

const signupPost = async (req, res) => {
  const csrfToken = uuidv4();
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    const accessToken = createToken(user, csrfToken);
    res.header("X-CSRF-TOKEN", csrfToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, //time in milliseconds
    });
    res.json({ msg: "Successfully Signed up!" });
  } catch (error) {
    console.log(error, "error of signup");
    const errorMsg = errorHandler(error);
    res.status(400).json(errorMsg);
  }
};

const logout = (req, res) => {
  res.cookie("accessToken", "");
  res.json({ msg: "Logged out successfully!" });
};

module.exports = { loginPost, signupPost, logout };
