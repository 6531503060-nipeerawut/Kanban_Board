const db = require('../config/db');

exports.assignUsersToTask = async (req, res) => {
  const { taskId, userIds } = req.body;
  try {
    for (const userId of userIds) {
      await db.query("INSERT IGNORE INTO task_assignees (task_id, user_id) VALUES (?, ?)", [taskId, userId]);

      const message = `You have been assigned to Task ID ${taskId}`;
      const [insertResult] = await db.query("INSERT INTO notifications (user_id, task_id, message) VALUES (?, ?, ?)", [userId, taskId, message]);

      // --- 🔔 Real-time Emit Notification ---
      const socketId = global.userSocketMap.get(userId);
      if (socketId) {
        global.io.to(socketId).emit('new_notification', {
          id: insertResult.insertId,
          message,
          taskId,
          is_read: false,
          created_at: new Date()
        });
      }
    }

    res.json({ message: "Users assigned and notified." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดูผู้รับผิดชอบ Task
exports.getAssigneesOfTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const [result] = await db.query(
      `SELECT u.id, u.name, u.email
       FROM users u
       JOIN task_assignees ta ON u.id = ta.user_id
       WHERE ta.task_id = ?`,
      [taskId]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};