const db = require('../config/db');

exports.inviteUserToBoard = async (req, res) => {
  const { boardId, email } = req.body;
  const inviterId = req.user.id;

  try {
    console.log('inviterId:', inviterId);
    console.log('boardId:', boardId);

    const [canInvite] = await db.query(
      `SELECT * FROM board_members
       WHERE board_id = ? AND user_id = ? AND role IN ('admin', 'owner')`,
      [boardId, inviterId]
    );

    console.log('canInvite:', canInvite);

    if (canInvite.length === 0) {
      return res.status(403).json({ error: "You don't have permission to invite users." });
    }

    const [users] = await db.query(`SELECT id FROM users WHERE email = ?`, [email]);
    if (users.length === 0) return res.status(404).json({ error: "User not found." });

    const invitedUserId = users[0].id;

    const [exists] = await db.query(
      `SELECT * FROM board_members WHERE board_id = ? AND user_id = ?`,
      [boardId, invitedUserId]
    );
    if (exists.length > 0) {
      return res.status(400).json({ error: "User already a member of this board." });
    }

    await db.query(
      `INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, 'member')`,
      [boardId, invitedUserId]
    );

    const message = `You have been invited to join board ID ${boardId}`;
    const [notification] = await db.query(
      `INSERT INTO notifications (user_id, message) VALUES (?, ?)`,
      [invitedUserId, message]
    );

    const socketId = global.userSocketMap.get(invitedUserId);
    if (socketId) {
      global.io.to(socketId).emit("new_notification", {
        id: notification.insertId,
        message,
        taskId: null,
        is_read: false,
        created_at: new Date()
      });
    }

    return res.json({ message: "User invited successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};