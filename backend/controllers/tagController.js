const db = require('../config/db');

// สร้าง Tag
exports.createTag = async (req, res) => {
  const { name, color } = req.body;
  try {
    const [result] = await db.query("INSERT INTO tags (name, color) VALUES (?, ?)", [name, color]);
    res.status(201).json({ id: result.insertId, name, color });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดึง Tag ทั้งหมด
exports.getAllTags = async (req, res) => {
  try {
    const [tags] = await db.query("SELECT * FROM tags");
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ผูก Tag กับ Task
exports.assignTagToTask = async (req, res) => {
  const { taskId, tagId } = req.body;
  try {
    await db.query("INSERT IGNORE INTO task_tags (task_id, tag_id) VALUES (?, ?)", [taskId, tagId]);
    res.json({ message: "Tag assigned to task" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบ Tag ออกจาก Task
exports.removeTagFromTask = async (req, res) => {
  const { taskId, tagId } = req.body;
  try {
    await db.query("DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?", [taskId, tagId]);
    res.json({ message: "Tag removed from task" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดู Tag ที่อยู่ใน Task หนึ่ง
exports.getTagsByTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const [tags] = await db.query(`
      SELECT t.id, t.name, t.color
      FROM tags t
      JOIN task_tags tt ON t.id = tt.tag_id
      WHERE tt.task_id = ?
    `, [taskId]);
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};