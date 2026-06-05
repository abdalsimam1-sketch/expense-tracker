const pool = require("../config/connectDB");
const { NotFound, BadRequest } = require("../errors/customErrors");

const getAll = async (req, res) => {
  const { filter, startDate, endDate } = req.query;
  const { userID } = req.user;

  if (filter === "all" || !filter) {
    const expenses = await pool.query(
      ` select * from expenses where user_id=$1`,
      [userID],
    );
    return res.status(200).json({ data: expenses.rows });
  } else if (filter === "past_week") {
    const expenses = await pool.query(
      `select * from expenses where user_id=$1 and expense_date>=now() - interval '7 day'`,
      [userID],
    );
    return res.status(200).json({ data: expenses.rows });
  } else if (filter === "past_month") {
    const expenses = await pool.query(
      `select * from expenses where user_id=$1 and expense_date>=now() - interval '1 month'`,
      [userID],
    );
    return res.status(200).json({ data: expenses.rows });
  } else if (filter === "past_3_months") {
    const expenses = await pool.query(
      `select * from expenses where user_id=$1 and expense_date>=now() - interval '3 month'`,
      [userID],
    );
    return res.status(200).json({ data: expenses.rows });
  } else {
    if (!startDate || !endDate) {
      throw new BadRequest("Select valid dates");
    }
    const expenses = await pool.query(
      `select * from expenses where user_id=$1 and expense_date>=$2 and expense_date<=$3`,
      [userID, startDate, endDate],
    );
    return res.status(200).json({ data: expenses.rows });
  }
};

const addExpense = async (req, res) => {
  const { description, category, amount, expense_date } = req.body;
  const { userID } = req.user;

  if (!expense_date || !category || !amount) {
    throw new BadRequest("All fields are required");
  }
  const expense = await pool.query(
    `insert into expenses(description,category,amount,expense_date,user_id) values($1,$2,$3,$4,$5) `,
    [description, category, amount, expense_date, userID],
  );
  res.status(201).json({ msg: "Expense added sucessfully", id: userID });
};

const updateExpense = async (req, res) => {
  const { userID } = req.user;
  const { id } = req.params;
  const { description, category, amount, expense_date } = req.body;

  const exists = await pool.query(
    `select * from expenses where user_id=$1  and expense_id=$2`,
    [userID, id],
  );
  if (exists.rows.length < 1) {
    throw new NotFound("Expense not found");
  }
  const newDescription = description || exists.rows[0].description;
  const newCategory = category || exists.rows[0].category;
  const newAmount = amount || exists.rows[0].amount;
  const newExpenseDate = expense_date || exists.rows[0].expense_date;

  const updated = await pool.query(
    `update expenses set description=$1, category=$2 ,amount=$3, expense_date=$4 where user_id=$5 and expense_id=$6`,
    [newDescription, newCategory, newAmount, newExpenseDate, userID, id],
  );
  res.status(200).json({ msg: "Expense updated successfully" });
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.user;

  const exists = await pool.query(
    `select * from expenses where user_id=$1  and expense_id=$2`,
    [userID, id],
  );
  if (exists.rows.length < 1) {
    throw new NotFound("Expense not found");
  }

  await pool.query(`delete  from expenses where expense_id=$1 and user_id=$2`, [
    id,
    userID,
  ]);

  res.status(200).json({ msg: "Deleted sucessfully" });
};

module.exports = { getAll, addExpense, updateExpense, deleteExpense };
