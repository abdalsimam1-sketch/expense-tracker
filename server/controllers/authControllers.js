const pool = require("../config/connectDB");
const {
  BadRequest,
  NotFound,
  Unauthorized,
} = require("../errors/customErrors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Invalid credentials");
  }
  const user = await pool.query(`select * from users where email=$1`, [email]);
  if (user.rows.length < 1) {
    throw new NotFound("User not found");
  }
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch) {
    throw new Unauthorized("Wrong password");
  }
  const payload = { userID: user.rows[0].user_id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ token });
};

//register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequest("Invalid credentials");
  }
  const duplicateEmail = await pool.query(
    `select * from users where email=$1`,
    [email],
  );
  const duplicateUsername = await pool.query(
    `select * from users where username=$1`,
    [username],
  );
  if (duplicateEmail.rows.length > 0 || duplicateUsername.rows.length > 0) {
    throw new BadRequest("User Already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await pool.query(
    `insert into users(username,email,password) values($1,$2,$3)`,
    [username, email, hashedPassword],
  );

  res.status(201).json({ msg: "User Registered" });
};

module.exports = { login, register };
