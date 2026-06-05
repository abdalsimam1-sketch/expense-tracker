const { Unauthorized } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new Unauthorized("Access Denied");
  }

  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID };
    next();
  } catch (error) {
    throw new Unauthorized("Invalid or expired stoken ");
  }
};

module.exports = auth;
