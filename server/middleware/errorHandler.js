const { CustomError } = require("../errors/customErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ msg: error.message });
  }
  res.status(500).json({ msg: "Internal server error" });
};

module.exports = errorHandler;
