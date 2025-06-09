const db = require('../config/db');

// ดู Notification ทั้งหมดของผู้ใช้
exports.getNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const [result] = await db.query(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark ว่าอ่านแล้ว
exports.markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    await db.query("UPDATE notifications SET is_read = TRUE WHERE id = ?", [notificationId]);
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
