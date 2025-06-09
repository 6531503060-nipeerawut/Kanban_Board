const db = require('../config/db');

exports.createColumn = async (req, res) => {
  const { board_id, name, position } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO columns (board_id, name, position) VALUES (?, ?, ?)",
      [board_id, name, position]
    );
    res.status(201).json({ id: result.insertId, name, position });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const { name, position } = req.body;
  try {
    await db.query(
      "UPDATE columns SET name = ? WHERE id = ?",
      [name, columnId]
    );
    res.json({ message: "Column updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteColumn = async (req, res) => {
  const { columnId } = req.params;
  try {
    await db.query("DELETE FROM columns WHERE id = ?", [columnId]);
    res.json({ message: "Column deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getColumnsByBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const [columns] = await db.query(
      "SELECT * FROM columns WHERE board_id = ? ORDER BY position ASC",
      [boardId]
    );
    res.json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};