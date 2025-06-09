const db = require('../config/db');

exports.getAllUsers = async () => {
  return await db.query('SELECT id, name, email, created_at, role_id FROM users');
};

exports.getUserById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, created_at, role_id FROM users WHERE id = ?', [id]);
  return rows[0];
};