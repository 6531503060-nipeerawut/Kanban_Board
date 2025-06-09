const db = require('../config/db');

exports.getTasksByColumn = async (req, res) => {
  const { columnId } = req.params;
  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE column_id = ? ORDER BY position ASC",
      [columnId]
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { column_id, title, position } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (column_id, title, position) VALUES (?, ?, ?)",
      [column_id, title, position]
    );
    res.status(201).json({ id: result.insertId, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, position } = req.body;
  try {
    await db.query(
      "UPDATE tasks SET title = ?, description = ?, position = ? WHERE id = ?",
      [title, description, position, taskId]
    );
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await db.query("DELETE FROM tasks WHERE id = ?", [taskId]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};