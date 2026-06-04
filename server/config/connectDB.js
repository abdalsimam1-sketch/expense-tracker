const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runQuery() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database Time:", res.rows[0]);
  } catch (err) {
    console.error("Database query error:", err.stack);
  }
}

runQuery();

module.exports = pool;
