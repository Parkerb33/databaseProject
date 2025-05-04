//file: server.js
 
const express = require("express");
const crypto = require('crypto');
const session = require("express-session");
const pool = require('./db');
const auth = require("./auth");
require("dotenv").config();
 
const app = express();
const saltRounds = 10;
 
app.use(express.json());
 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false} // would be set to true if using HTTPS
  })
);
 
// app.post("/register", auth.register);
app.post("/register", async (req, res) => {
 
  console.log("server.js: register ");
  const { username, email, password, role } = req.body;
 
  console.log(`server.js: register username: ${username}`);
  console.log(`server.js: register email: ${email}`);
  console.log(`server.js: register password: ${password}`);
  console.log(`server.js: register role: ${role}`);
 
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
 
  const query = 'INSERT INTO users (username, email, hash, salt, role) VALUES ($1, $2, $3, $4, $5) RETURNING id';
 
  const values = [username, email, hash, salt, role];
  console.log("trying query with these values...");
  console.log(values);
 
  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `${role} account created`, username: `${username}` });
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Username or email already exists.' });
  }
});
 
 
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});
 
app.get("/session", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});
 
app.get("/listings", async (req, res) => {
  const { category, sort } = req.query;

  let query = "SELECT username, email, category, price, desci FROM listings";
  const values = [];

  if (category) {
    query += " WHERE LOWER(category) = LOWER($1)";
    values.push(category);
  }

  if (sort === "low") {
    query += " ORDER BY price ASC";
  } else if (sort === "high") {
    query += " ORDER BY price DESC";
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("DB error in /api/listings:", err);
    res.status(500).send("Internal Server Error");
  }
});
 
app.post("/listings", async (req, res) => {
 
  console.log("server.js: listings ");
  const { username, email, phone, category, price, desci, picture } = req.body;
 
  console.log(`server.js: listings username: ${username}`);
  console.log(`server.js: listings email: ${email}`);
  console.log(`server.js: listings phone: ${phone}`);
  console.log(`server.js: listings categiry: ${category}`);
  console.log(`server.js: listings price: ${price}`);
  console.log(`server.js: listings desci: ${desci}`);
  console.log(`server.js: listings picture: ${picture}`);
 
 
  const query = `INSERT INTO listings (username, email, phone, category, price, desci, picture) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  const values = [username, email, phone, category, price, desci, picture];
  console.log("trying query with these values...");
  console.log(values);
 
  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `listing added`, username});
  } catch (error) {
    console.log("in catch block of server.js/listings");
    console.log(error);
  }
});

app.delete("/listings/truncate", async (req, res) => {
  try {
      await pool.query("TRUNCATE TABLE listings RESTART IDENTITY CASCADE");
      res.json({ message: "Listings table has been truncated." });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to truncate listings table." });
  }
});
 
app.post("/create-table", async (req, res) => {
  const { tableName, tableSchema } = req.body;

  if (!tableName || !tableSchema) {
      return res.status(400).json({ error: "Table name and schema are required." });
  }

  // Sanitize table name to prevent SQL injection
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
      return res.status(400).json({ error: "Invalid table name." });
  }

  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchema})`;

  try {
      await pool.query(query);
      res.json({ message: `Table '${tableName}' created successfully.` });
  } catch (err) {
      console.error("Error creating table:", err);
      res.status(500).json({ error: "Failed to create table." });
  }
});

app.post("/create-bookmark", async (req, res) => {
  const { tableName} = req.body;

  if (!tableName) {
      return res.status(400).json({ error: "Table name required." });
  }

  // Sanitize table name to prevent SQL injection
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
      return res.status(400).json({ error: "Invalid table name." });
  }

  // Define your static table schema
  const tableSchema = `
    id SERIAL PRIMARY KEY,
    bookname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    listing_id INT NOT NULL
  `;

  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchema})`;

  try {
      await pool.query(query);
      res.json({ message: `Table '${tableName}' created successfully.` });
  } catch (err) {
      console.error("Error creating table:", err);
      res.status(500).json({ error: "Failed to create table." });
  }
});

app.get("/admin/tables", async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT tablename
          FROM pg_catalog.pg_tables
          WHERE schemaname = 'public'
      `);
      const tables = result.rows.map(row => row.tablename);
      res.json(tables);
  } catch (err) {
      console.error("Error fetching tables:", err);
      res.status(500).json({ error: "Failed to fetch tables." });
  }
});

app.delete("/admin/tables/:name", async (req, res) => {
  const { name } = req.params;

  // Sanitize table name to prevent SQL injection
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
      return res.status(400).json({ error: "Invalid table name." });
  }

  try {
      await pool.query(`DROP TABLE IF EXISTS ${name} CASCADE`);
      res.json({ message: `Table '${name}' has been dropped.` });
  } catch (err) {
      console.error("Error dropping table:", err);
      res.status(500).json({ error: "Failed to drop table." });
  }
});

app.post("/login", auth.login);
 
app.get("/users", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /users");
  const result = await pool.query("SELECT username, email, role FROM users");
  console.log(`GET /users rows: ${result.rows}`);
  res.json(result.rows);
});

app.get("/my-listings", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userEmail = req.session.user.username; // assuming you store username (not email) in session

  try {
    const query = "SELECT username, email, price, category FROM listings WHERE username = $1";
    const result = await pool.query(query, [userEmail]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching user listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));