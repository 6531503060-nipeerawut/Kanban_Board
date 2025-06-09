const db = require('../config/db');

exports.createBoard = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    // สร้าง board
    const [result] = await db.query(
      "INSERT INTO boards (name, owner_id) VALUES (?, ?)",
      [name, userId]
    );

    const boardId = result.insertId;

    // ดึง role name ของ user จาก users → roles
    const [roleResult] = await db.query(`
      SELECT r.name AS roleName
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `, [userId]);

    const roleName = roleResult.length > 0 ? roleResult[0].roleName : 'user';

    // เพิ่มสมาชิกใน board พร้อม role ที่ดึงมา
    await db.query(
      "INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, ?)",
      [boardId, userId, roleName]
    );

    res.status(201).json({ id: boardId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  const userId = req.user.id;
  try {
    const [boards] = await db.query(`
      SELECT b.* FROM boards b
      JOIN board_members bm ON b.id = bm.board_id
      WHERE bm.user_id = ?
    `, [userId]);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoardMembers = async (req, res) => {
  const { boardId } = req.params;
  try {
    const [members] = await db.query(
      `SELECT u.id, u.name, u.email, r.name AS role
       FROM board_members bm
       JOIN users u ON u.id = bm.user_id
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE bm.board_id = ?`,
      [boardId]
    );
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.renameBoard = async (req, res) => {
  const { boardId } = req.params;
  const { name } = req.body;
  try {
    await db.query("UPDATE boards SET name = ? WHERE id = ?", [name, boardId]);
    res.json({ message: "Board renamed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    await db.query("DELETE FROM boards WHERE id = ?", [boardId]);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};