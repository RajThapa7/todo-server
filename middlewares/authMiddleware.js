const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { accessToken } = req.cookies;
  const csrfToken = req.headers["x-csrf-token"];

  jwt.verify(accessToken, "secret_key", (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ msg: "unauthorized : invalid access token" });
    }
    if (decodedToken.csrfToken !== csrfToken) {
      return res.status(401).json({ msg: "unauthorized : invalid csrf token" });
    }
    res.locals.userId = decodedToken.id; //sets the userId to the locals
    next();
  });
};

module.exports = { requireAuth };
