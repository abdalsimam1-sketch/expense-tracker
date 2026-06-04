const { NotFound } = require("../errors/customErrors");

const notFound = (req, res) => {
  throw new NotFound("This route does not exist");
};

module.exports = notFound;
