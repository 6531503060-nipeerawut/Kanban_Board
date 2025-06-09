const db = require('../config/db');

exports.getBoardsByUser = async (userId) => {
  const [boards] = await db.query(`
    SELECT b.* FROM boards b
    JOIN board_members bm ON b.id = bm.board_id
    WHERE bm.user_id = ?
  `, [userId]);
  return boards;
};