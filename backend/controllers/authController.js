const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // role เช่น 'Admin' หรือ 'User'
  try {
    // ตรวจสอบซ้ำ
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(400).json({ message: "Email already exists" });

    // ดึง role_id จากชื่อ role
    const [roleRow] = await db.query("SELECT id FROM roles WHERE name = ?", [role]);
    if (!roleRow.length) return res.status(400).json({ message: "Invalid role name" });

    const roleId = roleRow[0].id;

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashed, roleId]
    );

    res.status(201).json({ message: "User registered with role." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};