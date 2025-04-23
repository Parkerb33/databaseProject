//file: db.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Export the pool so it can be used in other parts of the app
module.exports = pool;

console.log("database config");
console.log(`${process.env.POSTGRES_USER}, ${process.env.POSTGRES_HOST},${process.env.POSTGRES_DB},${process.env.POSTGRES_PASSWORD},${process.env.POSTGRES_PORT}`);


