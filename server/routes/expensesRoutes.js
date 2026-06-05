const express = require("express");
const expensesRouter = express.Router();
const auth = require("../middleware/auth");
const {
  getAll,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseControllers");

expensesRouter.use(auth);
expensesRouter.get("/", getAll);
expensesRouter.post("/", addExpense);
expensesRouter.patch("/:id", updateExpense);
expensesRouter.delete("/:id", deleteExpense);

module.exports = expensesRouter;
