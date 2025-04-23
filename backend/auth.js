//file: auth.js
 
const crypto = require("crypto");
const db = require("./db");

async function login(req, res) {
  const { username, password } = req.body;
  console.log(`auth login username ${username}`);
  console.log(`auth login password ${password}`);
  const user = (await db.query("SELECT * FROM users WHERE username = $1", [username])).rows[0];
  if (!user) return res.status(401).json({ message: "Login failUre" });

  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
  if (hash !== user.hash) return res.status(401).json({ message: "Login fAilure"});

  console.log(`making session: ${user.username}, ${user.role}`);
  req.session.user = { username: user.username, role: user.role };
  res.json({ message: "Logged in" });
}

function ensureAdmin(req, res, next) {
  console.log("checking authroization ... ");
  console.log(`${req.session.user}`);
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

//module.exports = { register, login, ensureAdmin };
module.exports = { login, ensureAdmin };

