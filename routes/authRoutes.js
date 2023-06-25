const { Router } = require("express");
const {
  loginPost,
  signupPost,
  logout,
} = require("../controllers/authController");
const router = Router();

router
  .post("/login", loginPost)
  .post("/signup", signupPost)
  .post("/logout", logout);

module.exports = router;
